# WhatsApp Instagram Video Downloader Bot

<img src="https://img.shields.io/badge/Node.js-20%2B-green" alt="Node Version">

A WhatsApp bot that automatically detects Instagram links, downloads videos, and sends them back to users.

## Features
- Automatic Instagram link detection (Posts, Reels, Stories)
- Video downloading using yt-dlp
- Session persistence with encrypted credentials
- Automatic temporary file cleanup
- Cross-platform support (Windows/Linux)

## Prerequisites
- Node.js v20+
- yt-dlp 2025+
- FFmpeg (latest stable version)
- WhatsApp mobile app (for initial QR scan)

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/whatsapp-video-bot.git
cd whatsapp-video-bot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create `.env` file in root directory:
```env
LOCATION=./temp/  # Always include trailing slash
```

### 4. Tool Installation

#### Windows Users
```powershell
winget install yt-dlp
```
**Restart your computer after installation**

#### Debian/Ubuntu Users
```bash
# Install yt-dlp
sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp

# Install FFmpeg
sudo apt update
sudo apt install ffmpeg
```

## Usage

1. Start the bot:
```bash
node main.js
```

2. Scan QR code using WhatsApp mobile app:
   - Open WhatsApp → Settings → Linked Devices → Link a Device

3. Send Instagram link to bot:
   ```
   https://www.instagram.com/reel/CxYzABC123/
   ```

4. Receive downloaded video within 1-2 minutes

## Configuration

Edit `.env` file:
```env
# Required
LOCATION=./temp/
```

## Supported Systems
| OS           | Status      | Notes                  |
|--------------|-------------|------------------------|
| Windows 10/11| Verified    | Requires winget        |
| Ubuntu 22.04 | Verified    | Needs manual updates   |
| macOS        | Untested    | Community help needed  |

## Troubleshooting

### Common Issues
1. **"Command not found" errors**
   - Verify installation paths
   - Reinstall yt-dlp/FFmpeg

2. **Login session expires**
   - Delete `auth` folder and restart bot

3. **Large file failures**
```env
NODE_OPTIONS=--max-old-space-size=4096
```

## Contributing

We welcome contributions! Current priorities:

- [ ] Add Facebook support
- [ ] Implement YouTube Shorts download
- [ ] Improve error handling
- [ ] Add progress tracking

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request



---

**Important Notes**
- First run requires QR login
- Terminate and restart after initial setup
- Temporary files auto-delete after sending
