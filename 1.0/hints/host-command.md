# DNS Lookup

`host` is a very useful MacOs command, it helps you to lookup for any DNS record right from your terminal. 

Use case:

Let's say you added a new `A` record or nameserver or even CNAME record for your server and you want to check if it was propagated. 

You can use a service like [https://dnschecker.org/](https://dnschecker.org/) for that, or you can use the `host` command right from your machine.

## Host command 

DESCRIPTION:

       host is a simple utility for performing DNS lookups. It is normally
       used to convert names to IP addresses and vice versa. When no arguments
       or options are given, hhoosstt prints a short summary of its command line
       arguments and options.

       name is the domain name that is to be looked up. It can also be a
       dotted-decimal IPv4 address or a colon-delimited IPv6 address, in which
       case hhoosstt will by default perform a reverse lookup for that address.
       Server is an optional argument which is either the name or IP address
       of the name server that hhoosstt should query instead of the server or
       servers listed in /etc/resolv.conf.

OPTIONS:

       -4
           Use IPv4 only for query transport. See also the --66 option.

       -6
           Use IPv6 only for query transport. See also the --44 option.

       -a
           "All". The --aa option is normally equivalent to --vv --tt AANNYY. It also
           affects the behaviour of the --ll list zone option.

       -c
           Query class: This can be used to lookup HS (Hesiod) or CH
           (Chaosnet) class resource records. The default class is IN
           (Internet).

       -C
           Check consistency: hhoosstt will query the SOA records for zone _n_a_m_e
           from all the listed authoritative name servers for that zone. The
           list of name servers is defined by the NS records that are found
           for the zone.

       -d
           Print debugging traces. Equivalent to the --vv verbose option.

       -i
           Obsolete. Use the IP6.INT domain for reverse lookups of IPv6
           addresses as defined in RFC1886 and deprecated in RFC4159. The
           default is to use IP6.ARPA as specified in RFC3596.

       -l
           List zone: The hhoosstt command performs a zone transfer of zone _n_a_m_e
           and prints out the NS, PTR and address records (A/AAAA).

           Together, the --ll --aa options print all records in the zone.

       -N
           The number of dots that have to be in _n_a_m_e for it to be considered
           absolute. The default value is that defined using the ndots
           statement in /etc/resolv.conf, or 1 if no ndots statement is
           present. Names with fewer dots are interpreted as relative names
           and will be searched for in the domains listed in the sseeaarrcchh or
           ddoommaaiinn directive in /etc/resolv.conf.

       -r
           Non-recursive query: Setting this option clears the RD (recursion
           desired) bit in the query. This should mean that the name server
           receiving the query will not attempt to resolve _n_a_m_e. The --rr option
           enables hhoosstt to mimic the behavior of a name server by making
           non-recursive queries and expecting to receive answers to those
           queries that can be referrals to other name servers.

       -R
           Number of retries for UDP queries: If _n_u_m_b_e_r is negative or zero,
           the number of retries will default to 1. The default value is 1.

       -s
           Do _n_o_t send the query to the next nameserver if any server responds
           with a SERVFAIL response, which is the reverse of normal stub
           resolver behavior.

       -t
           Query type: The _t_y_p_e argument can be any recognized query type:
           CNAME, NS, SOA, TXT, DNSKEY, AXFR, etc.

           When no query type is specified, hhoosstt automatically selects an
           appropriate query type. By default, it looks for A, AAAA, and MX
           records. If the --CC option is given, queries will be made for SOA
           records. If _n_a_m_e is a dotted-decimal IPv4 address or
           colon-delimited IPv6 address, hhoosstt will query for PTR records.

           If a query type of IXFR is chosen the starting serial number can be
           specified by appending an equal followed by the starting serial
           number (like --tt IIXXFFRR==1122334455667788).

       -T
           TCP: By default, hhoosstt uses UDP when making queries. The --TT option
           makes it use a TCP connection when querying the name server. TCP
           will be automatically selected for queries that require it, such as
           zone transfer (AXFR) requests.

       -m 
           Memory usage debugging: the flag can be _r_e_c_o_r_d, _u_s_a_g_e, or _t_r_a_c_e.
           You can specify the --mm option more than once to set multiple flags.

       -v
           Verbose output. Equivalent to the --dd debug option.

       -V
           Print the version number and exit.

       -w
           Wait forever: The query timeout is set to the maximum possible. See
           also the --WW option.

       -W
           Timeout: Wait for up to _w_a_i_t seconds for a reply. If _w_a_i_t is less
           than one, the wait interval is set to one second.

           By default, hhoosstt will wait for 5 seconds for UDP responses and 10
           seconds for TCP connections.

           See also the --ww option.


## Host usage

Here are some 'real life' examples. 

### A record

Command:

```bash
host -t A binarcode.com
```

Output: 

```bash
binarcode.com has address 104.198.14.52
```

### CNAME record

Command:

```bash
host -t CNAME em5860.binarcode.com.
```

Output:

```bash
em5860.binarcode.com is an alias for u15784123.wl124.sendgrid.net.
```

### nameserver NS record

Command:

```bash
host -t ns binarcode.com.
```

Output:

```bash
binarcode.com name server ns4.mxserver.ro.
binarcode.com name server ns2.mxserver.ro.
binarcode.com name server ns3.mxserver.ro.
binarcode.com name server ns1.mxserver.ro
```

### ip address for nameserver

Command: 

```bash
host -t a ns3.mxserver.ro
```

Output:

```bash
ns3.mxserver.ro has address 159.89.237.53
```


## DIG command

A similar command is the `dig` command. However, it gives you more information unless `host` does, `host` feels more clean, it gives you want you need and nothing more.

Command: 
```bash
dig A binarcode
```

Output:

```bash
; <<>> DiG 9.10.6 <<>> A binarcode.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 24895
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;binarcode.com.			IN	A

;; ANSWER SECTION:
binarcode.com.		13354	IN	A	104.198.14.52

;; Query time: 30 msec
;; SERVER: 2a02:2f0c:8000:3::1#53(2a02:2f0c:8000:3::1)
;; WHEN: Wed Jun 24 19:52:08 EEST 2020
;; MSG SIZE  rcvd: 58
```

### dig short

As we can see `dig` gives a lot of information. There is a handy options you can get back exactly what your're looking for: 


```bash
dig +short A binarcode.com
```

Output:

```bash
104.198.14.52
```



