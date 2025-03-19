import {makeWASocket, Browsers, useMultiFileAuthState } from "baileys";
import  P  from "pino";
import fs from 'fs';
import { exec } from "child_process";


async function connectToWhatsapp() {

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

        //the line below is to handle invalid messages.
        if (!msg.message || !msg.key.remoteJid) return;


        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
        if (!text) return;
        console.log("downloading:", text);
        exec(`yt-dlp ${text} -o ${Date.now()}.mp4`, (error, stdout) => {
            if (error) {
                console.error(error);
                return;
            }
            console.log(stdout);
        })

    })

    return sock;
}

connectToWhatsapp()

