---
title: BINAR_LIVE_01
description: ''
position: 2
category: 'Procedures'
---

## Browserstack tests
- [x] Desktop: test on latest versions of Chrome, IE/Edge, Firefox, Safari
- [x] Mobile: test on latest versions of Mobile Safari, Android

## Frontend - SPA or NUXT

### Assets
- [x] Ensure that all sources start with  https://
- [x] Ensure that the browser list is properly configured for autoprefixer and babel-preset-env (ie moz- prefix)
- [x] When using PurgeCSS: check if layout is preserved.


### Scripts
- [x] Ensure you have  yarn.lock (or package-lock.json) present
- [x] Check JS lint errors.
- [x] Ensure you removed all console.log lines in scripts
- [x] Check for console errors on all pages


### Page weight
- [x] Evaluate total weight of at least homepage
- [x] Open Inspector network/timeline tab to identify heavy assets
- [x] Check if heavy assets are cached


### Audits
- [x] Use the Chrome DevTools (in incognito mode) and perform a mobile audit (with throttling) to fix common problems.
- [x] Repeat with a desktop audit.

### Check content (with an open console)
- [x] Are all strings / images present (and translated)?
- [x] Does menu/submenu have a correct active state on every page?
- [x] Are 404, 500 and 503 pages provided? Do they provide useful content like 'back to home', search or a navigation tree?

### Meta
- [x] Check page titles / descriptions
- [x] Test Facebook sharing. Provide og-tags if needed
- [x] Does Favicon load? Pin the tab in Safari to check pinned icon

### Components
- [x] Google Maps
  - [x] API key needed/configured?
  - [x] Check info windows
  - [x] Prevent zoom out beyond 1x world
  - [x] Try clicking on markers
- [x] Forms: fill out with wrong/right values
- [x] Video: check with sound on
- [x] Check layout of emails

## Backend - Administration panel - Nova
- [x] Ensure you have the .env.example file with all required variables, but without values
- [x] Set the correct application name in the .env => APP_NAME
- [x] Try the password reset flow for existing user
- [x] Check if a simple user don’t have access to nova panel
- [x] Telescope installation
- [x] Remove unused modules from main menu
- [x] Verify all e-mail recipients are correct
- [x] Scan database for urls to development domain
- [x] Check client's logo in header and emails headers

## Backend - API

- [x] Pass integration tests
- [x] Ensure you have .env.example with all variables, but without values
- [x] Ensure you have a custom configuration file, the name could be the project name (ie promopanda.php) - this should contain variables as frontend_app_fqdn
- [x] Ensure - the reset password URL/activate account URL in emails contains the production domain (they should use the frontend_app_fqdn as domain)

## Server, DNS & Services
- [x] Add redirects from old to new pages if necessary.
- [x] Install Let's Encrypt certificate
- [x] Check SSL certificate health https://www.ssllabs.com/ssltest/
- [x] Check your hostfile to make sure you're looking at the live site
- [x] Try visiting `www` domain, should redirect to `non-www`
- [x] Try out visiting `http`, should redirect to `https`
- [x] Verify that all http status codes are ok with https://github.com/spatie/http-status-check
- [x] Scan for mixed content with https://github.com/spatie/mixed-content-scanner-cli
- [x] Verify that indexing is not prohibited with `x-robots-tag: none` by checking `curl -I https://url | grep 'x-robots-tag'`. Allow robots in `.env`
- [x] Remove development DNS record
- [x] Check dns propagation with https://www.whatsmydns.net/
- [x] Verify Tag Manager / Analytics have been correctly set up
- [x] Make sure you can upload large media files [see this](/hints/)

### Google Search Console
- [x] Submit all www/non-www http/https variations
- [x] Set up non-www https as the preferred domain
- [x] Crawl > Fetch as Google > Submit to index to kickstart index

### Server
- [x] Are DigitalOcean backups enabled?
- [x] Are Amazon backups enabled?
- [x] Is the output of artisan task `backup:run` ok?
- [x] Is artisan scheduled on Forge?
- [x] Is Horizon configured in Supervisor on Forge? Command should be `php artisan horizon`. Path should be `/home/forge/my-new-site.com/current`
- [x] Is the url being monitored by [Oh Dear!](https://ohdearapp.com/)?
- [x] Is the server being monitored by our server-monitor?

### Github
- [x] Remove `develop` branch or other stale branches

## Testing & QA

- [x] After going live the QA SHOULD  test ONLY Staging environment in CRUD mode (editing, adding, deleting resources)
- [x] QA - SHOULD test the production environment ONLY in READ mode
- [x] QA SHOULD NOT add any personal details, or remove any other data from the production
- [x] QA SHOULD report any bug in the backlog with the following format:

![Bug Report Format](./img/bug-report-format.png)







<img src="/bug-report-format.png" width="480" height="480" alt="Bug Report Format"/>

