# Camera & Microphone Permissions Guide

## How to Grant Camera/Microphone Permissions

### For Google Chrome / Microsoft Edge / Brave Browser:

1. **Quick Method:**
   - Look for a camera/microphone icon in the address bar (left side of the URL)
   - Click on it
   - Select "Allow" for both Camera and Microphone
   - Refresh the page

2. **Via Browser Settings:**
   - Click the lock icon (🔒) or info icon (i) in the address bar
   - Click "Site settings" or "Permissions"
   - Set Camera to "Allow"
   - Set Microphone to "Allow"
   - Refresh the page

3. **Via Chrome Settings:**
   - Go to `chrome://settings/content/camera` (for camera)
   - Go to `chrome://settings/content/microphone` (for microphone)
   - Add `http://localhost:3001` to the "Allow" list
   - Or set to "Ask" and grant permission when prompted

### For Firefox:

1. **When Prompted:**
   - Click "Allow" when the browser asks for camera/microphone access
   - Check "Remember this decision" to avoid future prompts

2. **Via Settings:**
   - Click the lock icon in the address bar
   - Click "More Information"
   - Go to "Permissions" tab
   - Set Camera and Microphone to "Allow"
   - Refresh the page

### For Safari (macOS):

1. **System Preferences:**
   - Go to System Preferences → Security & Privacy → Privacy
   - Select "Camera" and check Safari
   - Select "Microphone" and check Safari
   - Restart Safari

2. **In Safari:**
   - Safari → Preferences → Websites
   - Select Camera/Microphone
   - Set localhost to "Allow"

### For Production (HTTPS):

When deployed to production (HTTPS), browsers will prompt automatically. Make sure:
- The site uses HTTPS (required for camera/microphone access)
- Users click "Allow" when prompted
- Users haven't previously blocked permissions

## Troubleshooting

### "Permission Denied" Error:
- Check if another application is using the camera/microphone
- Close other video conferencing apps (Zoom, Teams, etc.)
- Restart your browser
- Check system-level permissions (OS settings)

### "No Device Found" Error:
- Ensure camera/microphone is connected
- Check if device is enabled in system settings
- Try unplugging and reconnecting USB devices
- Check Device Manager (Windows) or System Information (Mac)

### "Device Already in Use" Error:
- Close other applications using camera/microphone
- Restart the browser
- Check if another browser tab is using the device

## Testing Permissions

You can test if permissions are working by:
1. Opening browser console (F12)
2. Running: `navigator.mediaDevices.getUserMedia({ video: true, audio: true })`
3. If it works, you'll see a promise that resolves
4. If it fails, you'll see the specific error

## Code Implementation

The application now provides detailed error messages based on the specific error type:
- **NotAllowedError**: Permission denied - shows instructions
- **NotFoundError**: No device found
- **NotReadableError**: Device in use by another app

## Security Note

Browsers require HTTPS for camera/microphone access in production. For localhost development, HTTP is allowed, but you must grant explicit permissions.

