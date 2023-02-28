#!/bin/bash
# The command to update git
# The github pages site is automatically updated via the docs subdirectory
# on building the Angular website.

# Initial github setup:
# git remote rm origin
# git remote add origin https://github.com/davidgma/course-notes.git
# git remote -v

if [ $# -gt 0 ]; then
	message=$*
else
	message="Upload changes."
fi

echo $message

# Send master files to github
git checkout master
git add *
git commit -a -m "${message}"
git push origin master

# https://davidgma.github.io/identity-services-demo