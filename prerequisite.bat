@echo off

set ROOT=%~dp0
set FLAG=%1

set DBPATH=%ROOT%\database
set DBHOST=0.0.0.0
set DBPORT=6969

if "%FLAG%"=="-v" call :badger & goto end
if "%FLAG%"=="--badger" call :badger & goto end

if "%FLAG%"=="-b" call :bolt & goto end
if "%FLAG%"=="--bolt" call :bolt & goto end

if "%FLAG%"=="-s" call :skytable & goto end
if "%FLAG%"=="--skytable" call :skytable & goto end

if "%FLAG%"=="-h" call :menu & goto end
if "%FLAG%"=="--help" call :menu & goto end

goto default

:menu
    echo Prerequisite is a CLI tool to initialize selected DB
    echo.
    echo Options:
    echo   -h --help         Show help options
    echo   -v --badger       Run badgerdb via vxdb
    echo   -b --bolt         Run boltdb via bbolt-api
    echo   -s --skytable     Run skytable
    echo.
    echo Usages:
    echo   prerequisite --help
    echo   prerequisite --badger
    echo   prerequisite --bolt
    echo   prerequisite --skytable
    goto end

:badger
    echo Initializing Badger DB ...
    cd %DBPATH%\badger\
    set DB_PATH=data\
    set HTTP_HOST=%DBHOST%:%DBPORT%
    vxdb
    goto end

:bolt
    echo Initializing Bolt DB ...
    cd %DBPATH%\bolt\
    set DATABASE_PATH=bolt.db
    set SERVER_PORT=%DBPORT%
    bbolt-api start
    goto end

:skytable
    echo Initializing Skytable ...
    cd %DBPATH%\skytable\
    skyd --host %DBHOST% --port %DBPORT%
    goto end

:default
    echo Error: Invalid option!
    goto end

:end
    cd %ROOT%
    exit /B
