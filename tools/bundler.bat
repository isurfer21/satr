@echo off
call ncc build -C ..\index.js
copy .\prerequisite.bat ..\dist\
copy .\prerequisite.sh ..\dist\
copy ..\config.json ..\dist\