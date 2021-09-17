---
title: Frontend Setup
description: ''
position: 1
category: Setup
---

Most of our projects are based on [Vue.js](https://vuejs.org/)

1. Create a repository under [BinarCode Github](https://github.com/binarcode)
2. Depending on the project type, use [Vue CLI](https://cli.vuejs.org/) or [Nuxt.js](https://nuxtjs.org/) to setup the project.
3. Make sure to cleanup everything that is unnecessary and not relevant.
4. Most of the projects will use [TailwindCSS](https://tailwindcss.com/) so follow their [installation steps](https://tailwindcss.com/docs/installation#1-install-tailwind-via-npm) or take a look at one of the existing projects to see how it's installed.
5. Integrate [Netlify](https://www.netlify.com/) for the repository or ask someone who has access to it to do it. Netlify should be configured to do deploy previews on master and develop branches.
6. Add github actions for compressing images.  

`.github/workflows/main.yml`

```yaml
# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the action will run. Triggers the workflow on push
# or pull request  events but only for the master branch
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

# A workflow run is made up of one or more jobs that can run 
# sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed 
    # as part of the job
    steps:
    # Checks-out your repository under $GITHUB_WORKSPACE, 
    # so your job can access it
    - uses: actions/checkout@v2

    - name: Compress Images
      uses: calibreapp/image-actions@master
      with:
        githubToken: ${{ secrets.GITHUB_TOKEN }}
        jpegQuality: "100"
        pngQuality: "100"
        webpQuality: "100"
        ignorePaths: "node_modules/**,build"
        # No spaces allowed
``` 
`.github/workflows/calibreapp-image-actions.yml`

```yaml
name: Compress images
on: pull_request
jobs:
  build:
    name: calibreapp/image-actions
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@master

      - name: Compress Images
        uses: calibreapp/image-actions@master
        with:
          githubToken: ${{ secrets.GITHUB_TOKEN }}
```
7. Make sure `master` branch is protected after initial project setup and requires at least 1 approval for each PR (pull request).
8. Specify from the start whether project is using `yarn` or `npm` and commit the appropriate `.lock` file.
9. Provide a basic README with a short project description and installation steps/dependencies.

### Summary 

A new frontend project setup should result in a github repository with Netlify previews integrated and automatic image compressions.
The repo should have the master branch protected and a short README describing the project and installation steps.
