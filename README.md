This whatsapp bot currently detects for any instagram links downloads them and sends back to the user!

### Basic info
the first time you run the file main.js you will get an qr asking you to login, after login your login credentials get's stored in the auth folder. you might need to terminate the node session once after login then return to make it detect messages for now it only detects instagram links, I will add other apps later!

### Perquisites 
you need node version 20+
yt-dlp version 2025+
latest ffmpeg version
any version below that may cause unknown errors!

### Step 1
setup .env

![.env example](/images/dotenv.png)
put your temporary file location where the files will be stored before sending is this format
!important --> do not forge to put "/" or "\" at the end otherwise you will get error

### step 2
download yt-dlp and ffmpeg

I have currently tested it with windows and a few debian based linux systems
You are welcome to test and contribute with other OS!

Windows --> 
if you are on windows put "winget yt-dlp" to your command line it automatically adds ffmpeg as dependency. that's pretty much it!
also after installing yt-dlp please restart your windows machine once to make it work properly

Debian -->
if you are on any debian bases system you might need to install yt-dlp and ffmpeg separately.
and be careful as the standard "sudo apt" provides you with outdated packages so I recommend going to their official github repos to get the latest packages