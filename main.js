//I am trying to make the code as readable as possible guys!
import {makeWASocket, Browsers, useMultiFileAuthState } from "baileys";
import  P  from "pino";
import fs from 'fs';
import { exec } from "child_process";
import dotenv from 'dotenv';

dotenv.config();


function IsFbOrInstaVideo(message) {
    const IsFbOrInstaVideoRegx = /https?:\/\/(?:www\.)?(?:instagram\.com\/(?:p|reel|tv)\/|facebook\.com\/(?:watch\/\?v=|reel\/|video\.php\?v=|share\/r\/|story\.php\?story_fbid=)|youtube\.com\/shorts\/)[a-zA-Z0-9_-]+/;
    //returns a boolean value indicating if the message contains an instagram/fb link or not
    return IsFbOrInstaVideoRegx.test(message);
}


//the function is implemented to use exec is non callback manner
function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(stdout)
            }
        })
    })
}


// this function downloads the video using an command line utility called yt-dlp 
async function downloadVideo(link, fileLoc) {

    const command = `yt-dlp ${link} -o ${fileLoc} -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]"`;
    const stdout = await runCommand(command);

    console.log(stdout);
}


async function connectToWhatsapp() {

    //the auth folder which will created contains login info so we don't have to login each time we restart the bot
    const {state, saveCreds} = await useMultiFileAuthState("auth");

    const sock = makeWASocket({
        auth:state,
        browser: Browsers.ubuntu('my app'),
        printQRInTerminal: true,
        logger: P(),
        shouldSyncHistoryMessage: false
    })
    sock.ev.on("creds.update", saveCreds)

    sock.ev.on('connection.update', (update) => {
        const {connection, lastDisconnect} = update;
    
        if (connection === 'close') {
            connectToWhatsapp()
        }
    })

    sock.ev.on('messages.upsert', async ({messages}) => {
        const msg = messages[0];

        //the lines below is to handle invalid messages.
        if (!msg.message || !msg.key.remoteJid) return;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
        if (!text) return;

        if (IsFbOrInstaVideo(text) == false) {
            console.log("not an fb or instagram link");
            return;
        }

        console.log("downloading:", text);

        //basically this is the file location where the temporary files get's stored and it makes the timestamp as file name
        //change it as your own preference
        const fileLocation = `${process.env.location}${Date.now()}.mp4`

        try {
            await downloadVideo(text, fileLocation);
            console.log("video downloaded at ", fileLocation);
        }
        catch (error) {
            console.error("error downloading video: ", error)
        }

        // need to handle errors later
        sock.sendMessage(msg.key.remoteJid, {
            video: fs.readFileSync(fileLocation),
            contextInfo: {
                quotedMessage: msg.message,
                stanzaId: msg.key.id,
                participant: msg.key.participant || msg.key.remoteJid
            }
        }).then(console.log("file sent to user!"))
        .then(fs.unlinkSync(fileLocation)) //delete file after sending.

    })

    return sock;
}

connectToWhatsapp()
