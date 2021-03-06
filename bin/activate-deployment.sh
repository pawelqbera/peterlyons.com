#!/bin/bash
#
# This script sets up file owner/group/perms after the code
# has been extracted on a production host.
# It should be run as root via sudo

set_baseline_permissions() {
  local user="$1"
  local target="$2"
  chown -R "${user}:sudo" "${target}"
  find "${target}" -type d -print0 | xargs -0 chmod 550
  find "${target}" -type f -print0 | xargs -0 chmod 440
}

repoint_current_symlink() {
  local code_dir=$(basename "${PWD}")
  # directory above project root
  cd ..
  # http://blog.moertel.com/posts/2005-08-22-how-to-change-symlinks-atomically.html
  # http://stackoverflow.com/a/1385261/266795
  ln -nsf "${code_dir}" current_tmp && mv -Tf current_tmp current
  cd -
}

##### main code #####
# Project root is our working directory
cd $(dirname "$0")/..
set_baseline_permissions "${1-plws}" .
chmod ug+x ./node/bin/* ./node_modules/.bin/* ./bin/* ./app/server.js
chmod a+rx . ./node_modules ./node_modules/zeroclipboard third-party
chmod a+r ./node_modules/zeroclipboard/*

set_baseline_permissions "${1-plws}" ../data

# allow the app to write new blog posts in this directory
find "../data/posts" -type d -print0 | xargs -0 chmod u+wx

# allow the app to make new git commits in this directory
find "../data/.git" -type d -print0 | xargs -0 chmod u+wx
find "../data/.git" -type f -print0 | xargs -0 chmod u+w

repoint_current_symlink
