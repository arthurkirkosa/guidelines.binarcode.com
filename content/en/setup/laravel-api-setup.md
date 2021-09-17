---
title: Laravel API Setup
description: ''
position: 2
category: Setup
---

## VCS

1. Create a repository under [BinarCode Github](https://github.com/binarcode)
2. Make `master` branch default one
3. Add rules to `master` branch to not allow direct push
4. Invite collaborators to the repository


## Laravel API setup

1. Usually the [documentation](https://laravel.com/docs/7.x#installation) should be enough for installation
2. Install [Laravel Restify](https://restify.binarcode.com/docs/3.0/quickstart.html)
3. Install [Laravel Nova](https://nova.laravel.com/docs/3.0/installation.html)
4. Laravel Restify and Nova should use BinarCode sources.


## Laravel Restify Internal
Add in `composer.json`:
```json
"repositories": [
        {
            "type": "vcs",
            "url": "git@github.com:BinarCode/laravel-restify.git"
        }
    ]
```
And: 
```json
"require": {
    "php": "^7.4",
    "binaryk/laravel-restify": "3.x-dev",
    ...  
}
```

Run: `composer update`.

## Laravel Nova Internal
Add in `composer.json`:
```json
"repositories": [
        {
            "type": "vcs",
            "url": "git@github.com:BinarCode/nova.git"
        }
    ]
```
And: 
```json
"require": {
    "php": "^7.4",
    "laravel/nova": "dev-3.0-binar",
    ...  
}
```

Run: `composer update`.


## Laravel Telescope

From the start would be good to have [Laravel Telescope](https://laravel.com/docs/7.x/telescope).


## Deployment

The API should be deployed usually on AWS via [Laravel Forge](https://forge.laravel.com/).

- [ ] Ask the stakeholder for a forge account and AWS IAM user key/secret. 
- [ ] Login into Forge and create the server
- [ ] Add your public [ssh key](https://forge.laravel.com/servers/364535#/keys) into the server
- [ ] Create a website into that server (ie: api.binarcode.com)
- [ ] Use [LetsEncrypt](https://letsencrypt.org/) for adding SSL. This is a single button click on laravel forge.
- [ ] SSH login and make sure you have configured the database connection into `.env`
- [ ] Run commands:

```bash
cd api.binarcode.com

php artisan key:generate

php artisan migrate:fresh --seed
```

- [x] Ask stakeholder to add an A record with the server IP (from Forge) and subdomain value into his DNS provider (ie `A 1.2.3.4 api.binarcode.com`)
