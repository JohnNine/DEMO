#!/usr/local/bin/awk -f

BEGIN {
    printf "host\tloss\trtt min\tavg\tmax\tstddev\n"
}

/^---/ {
    split($2, a, ".")
    printf "%s\t", a[2]
}

/^[0-9]+ packets transmitted/ {
    printf "%s\t", $7
}

/^round-trip/ {
    split($4, a, "/")
    printf "%s\t%s\t%s\t%s\n", a[1], a[2], a[3], a[4]
}


