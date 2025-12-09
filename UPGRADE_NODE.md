# Upgrade Node.js to Version 20

✅ **Node.js 20.19.6 has been successfully installed!**

Your project requires Node.js >= 20.9.0. Node.js 20.19.6 is now installed via nvm and set as the default version.

## Status
- Node.js 20.19.6 is installed and active
- nvm is configured in your `.bashrc`
- Node.js 20 is set as the default version

## Using Node.js 20

For **new terminal sessions**, nvm will automatically load Node.js 20.

For your **current terminal session**, you can either:
1. Close and reopen your terminal, OR
2. Run this command to load nvm:
   ```bash
   export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   ```

Then verify with:
```bash
node --version  # Should show v20.19.6
```

Now you can run your project:
```bash
cd ~/cird
npm run dev
```

## Option 1: Using nvm (Recommended for Development)

1. Install nvm (if not already installed):
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
   ```

2. Load nvm in your current terminal:
   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   ```

3. Install Node.js 20 LTS:
   ```bash
   nvm install 20
   nvm use 20
   nvm alias default 20
   ```

4. Verify the version:
   ```bash
   node --version
   ```

5. Close and reopen your terminal, then navigate to your project and run:
   ```bash
   npm run dev
   ```

## Option 2: Using NodeSource Repository (System-wide)

1. Add the NodeSource repository:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   ```

2. Install Node.js 20:
   ```bash
   sudo apt-get install -y nodejs
   ```

3. Verify the version:
   ```bash
   node --version
   ```

## Option 3: Using Snap

```bash
sudo snap install node --classic --channel=20
```

## After Installation

Once Node.js 20 is installed, you can run:
```bash
npm run dev
```

