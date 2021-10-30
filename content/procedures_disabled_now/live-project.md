---
title: Going Live
description: 'Go-live is the time at which something becomes available for use. In software development, go-live is the point at which code moves from the test environment to the production environment.'
position: 7
category: 'Procedures'

testsList:
- Desktop:<span> test on latest versions of Chrome, IE/Edge, Firefox, Safari</span>
- Mobile:<span> test on latest versions of Mobile Safari, Android</span>
assetsList:
- Ensure that all sources start with  https://
- Ensure that the browser list is properly configured for autoprefixer and babel-preset-env (ie moz- prefix)
- When using PurgeCSS:check if layout is preserved.
scriptsList:
- Ensure you have  yarn.lock (or package-lock.json) present
- Check JS lint errors.
- Ensure you removed all console.log lines in scripts
- Check for console errors on all pages
pageWeightList:
- Evaluate total weight of at least homepage
- Open Inspector network/timeline tab to identify heavy assets
- Check if heavy assets are cached
auditsList:
- Use the Chrome DevTools (in incognito mode) and perform a mobile audit (with throttling) to fix common problems.
- Repeat with a desktop audit.
checkContent:
- Are all strings / images present (and translated)?
- Does menu/submenu have a correct active state on every page?
- Are 404, 500 and 503 pages provided? Do they provide useful content like 'back to home', search or a navigation tree?
metaList:
- Check page titles / descriptions
- Test Facebook sharing. Provide og-tags if needed
- Does Favicon load? Pin the tab in Safari to check pinned icon
componentsList:
- Google Maps
- API key needed/configured?
- Check info windows
- Prevent zoom out beyond 1x world
- Try clicking on markers
- Forms:<span> fill out with wrong/right values</span>
- Video:<span> check with sound on</span>
- Check layout of emails
backendNovaList:
- Ensure you have the .env.example file with all required variables, but without values
- Set the correct application name in the .env => APP_NAME
- Try the password reset flow for existing user
- Check if a simple user don’t have access to nova panel
- Telescope installation
- Remove unused modules from main menu
- Verify all e-mail recipients are correct
- Scan database for urls to development domain
- Check client's logo in header and emails headers

backendList:
- Pass integration tests
- Ensure you have .env.example with all variables, but without values
- Ensure you have a custom configuration file, the name could be the project name (ie promopanda.php) - this should contain variables as frontend_app_fqdn
- Ensure - the reset password URL/activate account URL in emails contains the production domain (they should use the frontend_app_fqdn as domain)

servicesList:
- Add redirects from old to new pages if necessary.
- Install Let's Encrypt certificate
- Check SSL certificate health <a target="blank" href="https://www.ssllabs.com/ssltest/">https://www.ssllabs.com/ssltest/</a> 
- Check your hostfile to make sure you're looking at the live site
- Try visiting <code>www</code> domain, should redirect to <code>non-www</code>
- Try out visiting <code>http</code>, should redirect to <code>https</code>
- Verify that all http status codes are ok with <a target="blank" href="https://github.com/spatie/http-status-check">https://github.com/spatie/http-status-check</a>  
- Scan for mixed content with  <a target="blank" href=" https://github.com/spatie/mixed-content-scanner-cli"> https://github.com/spatie/mixed-content-scanner-cli</a> 
- Verify that indexing is not prohibited with <code>x-robots-tag:none</code> by checking <code>curl -I https://url | grep 'x-robots-tag'</code>. Allow robots in <code>.env</code>
- Remove development DNS record
- Check dns propagation with <a target="blank" href="https://www.whatsmydns.net/">https://www.whatsmydns.net/</a>  
- Verify Tag Manager / Analytics have been correctly set up
- Make sure you can upload large media files <a target="blank" href="/hints/how-to-do">see this</a>

googleList:
- Submit all www/non-www http/https variations
- Set up non-www https as the preferred domain
- Crawl > Fetch as Google > Submit to index to kickstart index

serverList:
- Are DigitalOcean backups enabled?
- Are Amazon backups enabled?
- Is the output of artisan task <code>backup:run</code> ok?
- Is artisan scheduled on Forge?
- Is Horizon configured in Supervisor on Forge? Command should be <code>php artisan horizon</code>. Path should be <code>/home/forge/my-new-site.com/current</code>
- Is the url being monitored by <a href="https://ohdearapp.com/">Oh Dear!</a>?
- Is the server being monitored by our server-monitor?

githubList:
- Remove <code>develop</code> branch or other stale branches

---

## Browserstack tests
<base-list :list="testsList"></base-list>

## Frontend - SPA or NUXT

### Assets
<base-list :list="assetsList"></base-list>

### Scripts
<base-list :list="scriptsList"></base-list>

### Page weight
<base-list :list="pageWeightList"></base-list>

### Audits
<base-list :list="auditsList"></base-list>

### Check content (with an open console)
<base-list :list="checkContent"></base-list>

### Meta
<base-list :list="metaList"></base-list>

### Components
<base-list :list="componentsList"></base-list>

## Backend - Administration panel - Nova
<base-list :list="backendNovaList"></base-list>

## Backend - API
<base-list :list="backendList"></base-list>

## Server, DNS & Services
<base-list :list="servicesList"></base-list>

### Google Search Console
<base-list :list="googleList"></base-list>

### Server
<base-list :list="serverList"></base-list>

### Github
<base-list :list="githubList"></base-list>

