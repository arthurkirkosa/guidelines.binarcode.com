# Go - Live - BINAR_LIVE_01

[[toc]]

## Browserstack tests
- [ ] Desktop: test on latest versions of Chrome, IE/Edge, Firefox, Safari
- [ ] Mobile: test on latest versions of Mobile Safari, Android

## Frontend - SPA or NUXT

### Assets
 - [ ] Ensure that all sources start with  https://
 - [ ] Ensure that the browser list is properly configured for autoprefixer and babel-preset-env (ie moz- prefix)
 - [ ] When using PurgeCSS: check if layout is preserved.


### Scripts
 - [ ] Ensure you have  yarn.lock (or package-lock.json) present
 - [ ] Check JS lint errors. 
 - [ ] Ensure you removed all console.log lines in scripts
 - [ ] Check for console errors on all pages


### Page weight
- [ ] Evaluate total weight of at least homepage
- [ ] Open Inspector network/timeline tab to identify heavy assets
- [ ] Check if heavy assets are cached


### Audits
- [ ] Use the Chrome DevTools (in incognito mode) and perform a mobile audit (with throttling) to fix common problems.
- [ ] Repeat with a desktop audit.

### Check content (with an open console)
- [ ] Are all strings / images present (and translated)?
- [ ] Does menu/submenu have a correct active state on every page?
- [ ] Are 404, 500 and 503 pages provided? Do they provide useful content like 'back to home', search or a navigation tree?

### Meta
- [ ] Check page titles / descriptions
- [ ] Test Facebook sharing. Provide og-tags if needed
- [ ] Does Favicon load? Pin the tab in Safari to check pinned icon

### Components
- [ ] Google Maps
    - [ ] API key needed/configured?
    - [ ] Check info windows
    - [ ] Prevent zoom out beyond 1x world
    - [ ] Try clicking on markers
- [ ] Forms: fill out with wrong/right values
- [ ] Video: check with sound on
- [ ] Check layout of emails

## Backend - Administration panel - Nova
- [ ] Ensure you have the .env.example file with all required variables, but without values
- [ ] Set the correct application name in the .env => APP_NAME
- [ ] Try the password reset flow for existing user
- [ ] Check if a simple user don’t have access to nova panel
- [ ] Telescope installation
- [ ] Remove unused modules from main menu
- [ ] Verify all e-mail recipients are correct
- [ ] Scan database for urls to development domain
- [ ] Check client's logo in header and emails headers

## Backend - API

- [ ] Pass integration tests
- [ ] Ensure you have .env.example with all variables, but without values
- [ ] Ensure you have a custom configuration file, the name could be the project name (ie promopanda.php) - this should contain variables as frontend_app_fqdn
- [ ] Ensure - the reset password URL/activate account URL in emails contains the production domain (they should use the frontend_app_fqdn as domain)

## Server, DNS & Services
- [ ] Add redirects from old to new pages if necessary.
- [ ] Install Let's Encrypt certificate
- [ ] Check SSL certificate health https://www.ssllabs.com/ssltest/
- [ ] Check your hostfile to make sure you're looking at the live site
- [ ] Try visiting `www` domain, should redirect to `non-www`
- [ ] Try out visiting `http`, should redirect to `https`
- [ ] Verify that all http status codes are ok with https://github.com/spatie/http-status-check
- [ ] Scan for mixed content with https://github.com/spatie/mixed-content-scanner-cli
- [ ] Verify that indexing is not prohibited with `x-robots-tag: none` by checking `curl -I https://url | grep 'x-robots-tag'`. Allow robots in `.env`
- [ ] Remove development DNS record
- [ ] Check dns propagation with https://www.whatsmydns.net/
- [ ] Verify Tag Manager / Analytics have been correctly set up

### Google Search Console
- [ ] Submit all www/non-www http/https variations
- [ ] Set up non-www https as the preferred domain 
- [ ] Crawl > Fetch as Google > Submit to index to kickstart index

### Server
- [ ] Are DigitalOcean backups enabled?
- [ ] Are Amazon backups enabled?
- [ ] Is the output of artisan task `backup:run` ok?
- [ ] Is artisan scheduled on Forge?
- [ ] Is Horizon configured in Supervisor on Forge? Command should be `php artisan horizon`. Path should be `/home/forge/my-new-site.com/current`
- [ ] Is the url being monitored by [Oh Dear!](https://ohdearapp.com/)?
- [ ] Is the server being monitored by our server-monitor?

### Github
- [ ] Remove `develop` branch or other stale branches 
 
## Testing & QA

- [ ] After going live the QA SHOULD  test ONLY Staging environment in CRUD mode (editing, adding, deleting resources)
- [ ] QA - SHOULD test the production environment ONLY in READ mode
- [ ] QA SHOULD NOT add any personal details, or remove any other data from the production
- [ ] QA SHOULD report any bug in the backlog with the following format:

![Bug Report Format](./img/bug-report-format.png)





