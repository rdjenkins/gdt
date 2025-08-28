#!/bin/bash

# Exit if any command fails
set -e

# Build the project
npm install
npm run build

# Switch to gh-pages branch (create if doesn't exist)
git checkout gh-pages || git checkout --orphan gh-pages

# Remove old files except .git
find . -maxdepth 1 ! -name '.' ! -name '..' ! -name '.git' ! -name 'dist' ! -name 'node_modules' -exec rm -rf {} +

# Copy built files to root
cp -r dist/* .

# Stage all changes
git add .

# Commit
git commit -m "Deploy latest build"

# Push to gh-pages branch
git push origin gh-pages

# Switch back to main branch
git checkout main
