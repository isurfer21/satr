#!/usr/bin/env bash
ROOTDIR=`dirname $0`

FLAG=$1

DBPATH=$ROOTDIR/database
DBHOST=0.0.0.0
DBPORT=6969

case $FLAG in

  '-h' | '--help')
    echo "Prerequisite is a CLI tool to initialize selected DB

 Options:
  -h --help         Show help options
  -v --badger       Run badgerdb via vxdb
  -b --bolt         Run boltdb via bbolt-api 
  -s --skytable     Run skytable

 Usages:
  sh prerequisite.sh --help
  sh prerequisite.sh --badger
  sh prerequisite.sh --bolt
  sh prerequisite.sh --skytable
  "
    ;;

  '-v' | '--badger')
    echo "Initializing Badger DB ..."
    [ -d $DBPATH/badger/ ] || mkdir -p $DBPATH/badger/
    cd $DBPATH/badger/
    DB_PATH=data HTTP_HOST=$DBHOST:$DBPORT vxdb
    ;;

  '-b' | '--bolt')
    echo "Initializing Bolt DB ..."
    [ -d $DBPATH/bolt/ ] || mkdir -p $DBPATH/bolt/
    cd $DBPATH/bolt/
    DATABASE_PATH=bolt.db SERVER_PORT=$DBPORT bbolt-api start
    ;;

  '-s' | '--skytable')
    echo "Initializing Skytable ..."
    [ -d $DBPATH/skytable/ ] || mkdir -p $DBPATH/skytable/
    cd $DBPATH/skytable/
    skyd --host $DBHOST --port $DBPORT
    ;;

  *)
    echo "Missing arguments"
    ;;
esac