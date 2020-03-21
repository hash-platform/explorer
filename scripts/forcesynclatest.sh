#!/bin/sh
# this super hack will sync the explorer from the newest block as they occur
forcesync() {
  blockcount=$1
  echo "╒══════════════════<<"
  echo "| height : $blockcount"
  blockhash=`curl -s http://62.171.160.137/api/getblockhash?height=$blockcount`
  echo "| ଓ hash : $blockhash"
  curl -s http://62.171.160.137/block/$blockhash > /dev/null
  echo "╘═══════════════════════════════>>"
}

main() {
  echo "Checking for new block..."
  previousblockcount=$currentblockcount
  currentblockcount=`curl -s http://62.171.160.137/api/getblockcount`
  if [ $currentblockcount -ne $previousblockcount ]; then
    echo "New block found. Syncing..."
    forcesync $currentblockcount
  else echo "No new block found. Sleeping...";  fi
  sleep 20
  main
}

currentblockcount=0
main
