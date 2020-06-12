# How to do this?

## Upload large media files

There are required 2 configurations: 

1. websever (nginx) - configuration

```php
sudo vi /etc/nginx/nginx.conf
```

In the `http` or `server` section, add this: 

```php
client_max_body_size 100M;
```


2. php configuration

- php fpm

```php
grep -E "upload_max_filesize|memory_limit|post_max_size" /etc/php/7.4/fpm/php.ini
```

add this in the `php.ini`:

```php
memory_limit = 512M
post_max_size = 100M
upload_max_filesize = 100M
```

- php CLI - this is optional:


```php
grep -E "upload_max_filesize|memory_limit|post_max_size" /etc/php/7.4/cli/php.ini
```

add this in the `php.ini`:

```php
memory_limit = 512M
post_max_size = 100M
upload_max_filesize = 100M
```
