---
title: How to do this?
description: ''
position: 1
category: 'Hints'
---


## Upload large media files

There are required 2 configurations: 

1. websever (nginx) - configuration

```bash
sudo vi /etc/nginx/nginx.conf
```

In the `http` or `server` section, add this: 

```bash
client_max_body_size 100M;
```


2. PHP Configuration

- PHP FPM

<alert type="success"> Check your PHP FPM configuration grep -E "upload_max_filesize|memory_limit|post_max_size" /etc/php/7.4/fpm/php.ini</alert>



Add this in the `php.ini`:

```bash
memory_limit = 512M
post_max_size = 100M
upload_max_filesize = 100M
```

- PHP CLI (optional):

<alert> Check your PHP CLI configuration grep -E "upload_max_filesize|memory_limit|post_max_size" /etc/php/7.4/cli/php.ini</alert>

add this in the `php.ini`:

```bash
memory_limit = 512M
post_max_size = 100M
upload_max_filesize = 100M
```
