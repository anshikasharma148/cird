#!/bin/bash
# Script to push changes to GitHub

echo "Checking git status..."
git status

echo ""
echo "Staging all changes..."
git add .

echo ""
echo "Committing changes..."
git commit -m "Update Node.js to 20.19.6 and configure dev server to run on port 3001

- Upgraded Node.js from 18.18.0 to 20.19.6 via nvm
- Configured dev server to run on port 3001
- Added UPGRADE_NODE.md documentation
- Added GIT_SETUP.md documentation"

echo ""
echo "Pushing to GitHub..."
git push origin main

echo ""
echo "Done! Check https://github.com/anshikasharma148/cird to verify."



