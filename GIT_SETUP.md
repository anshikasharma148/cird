# Git Setup and Push Instructions

## Step 1: Install Git

Run this command to install git:
```bash
sudo apt install git -y
```

## Step 2: Configure Git (if not already done)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Initialize Repository (if needed)

If the repository is not already initialized:
```bash
cd ~/cird
git init
```

## Step 4: Add Remote (if not already configured)

```bash
git remote add origin https://github.com/anshikasharma148/cird.git
```

Or if it's already added, verify with:
```bash
git remote -v
```

## Step 5: Stage, Commit, and Push

```bash
# Stage all changes
git add .

# Commit changes
git commit -m "Update Node.js to 20.19.6 and configure dev server to run on port 3001"

# Push to GitHub
git push -u origin main
```

Note: If you're pushing for the first time or the branch name is different, you might need:
```bash
git push -u origin main
# or
git push -u origin master
```

