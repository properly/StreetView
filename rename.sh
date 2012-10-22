#!/bin/sh
a=0
while read LINE; do
  let n=a%16
  let row=a/16
  mv ${LINE} ../${row}_${n}.jpg
  let a=a+1
done
