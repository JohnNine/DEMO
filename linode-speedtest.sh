#!/bin/bash

list="
http://speedtest.newark.linode.com/100MB-newark.bin
http://speedtest.atlanta.linode.com/100MB-atlanta.bin
http://speedtest.dallas.linode.com/100MB-dallas.bin
http://speedtest.fremont.linode.com/100MB-fremont.bin
http://speedtest.toronto1.linode.com/100MB-toronto1.bin
http://speedtest.frankfurt.linode.com/100MB-frankfurt.bin
http://speedtest.london.linode.com/100MB-london.bin
http://speedtest.singapore.linode.com/100MB-singapore.bin
http://speedtest.tokyo2.linode.com/100MB-tokyo.bin
http://speedtest.mumbai1.linode.com/100MB-mumbai.bin
"

test_download_speed() {
    for i in $list; do
        echo $i
        curl "$i" >/dev/null &
        sleep 10
        echo
        kill $!
        wait
        echo
    done
}

test_ping() {
    for i in $list; do
        host=$(echo $i | awk -F '/' '{ print $3 }')
        ping -q -c 30 $host
        echo
    done
}

test_download_speed
test_ping | tee log-ping.txt
awk -f ./report-ping.awk ./log-ping.txt


