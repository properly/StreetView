#!/bin/sh
for file in img/*/images; do
  if [ -d $file ]; then
    cd $file; ls|../../../rename.sh; cd ../; rm -r images; cd ../../;
  fi
done
