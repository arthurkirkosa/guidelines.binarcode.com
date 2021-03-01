# Version Control

Since we're a small team, our git workflow doesn't have restrictions out of this world,
however some common sense best practices should be followed in order to have a clean and readable version control workflow.

### Repo naming conventions

Repositories should have descriptive names, ideally the domain they are hosted on.

<Badge text="Bad" type="error"/> 
`website` `frontend` `client-app`

<Badge text="Good"/> 
`binarcode.com` `api.binarcode.com` `binarcode-admin`

### Branches

Each project should have a **protected** `master` and `develop` branch.
After initial project setup, each functionality, fix or change should be down in its own branch.

Branches should be always up to date with base branch and have no merge conflicts.
Make sure your branch doesn't stay behind more than 5 commits from the base branch.

<Badge text="Bad" type="error"/> 
`fix` `bug-fixes` `some-changes`

<Badge text="Good"/> 
`TASK-23` `feat/contact-page` `fix/route-names`

Where TASK-23 is a given JIRA Task.

#### LIVE PROJECTS

Once a project goes live the master branch should be updated only via
Pull requests from `develop` branch and **must be stable**.  

### Pull Requests

Pull Requests are essential in our workflow as they are the main source of truth to keep the people
working on the project in sync regarding the project functionality, codebase and the progress.
Each Pull Request should be reviewed by at least one person with exceptions when the reviewer is not available and there's an urgent fix.

#### Pull Request Title

Should have a descriptive title explaining what it does.

<Badge text="Bad" type="error"/> 
- `fixes`
- `bug-fixes`
- `task-34`
- `homepage fix`

<Badge text="Good"/> 
- `[TASK-23] Contact page implementation`
- `[TASK-4] Modal component`
- `Fixes & improvements for shopping cart`
- `[WIP] Navbar menu component`

#### Pull Request Description

A good PR Description is essential in avoiding questions, delays and miss-understandings.
By providing a good description, you will save time yourself for answering questions as well as reviewer's time understanding the purpose of the PR.

Provide notes or remarks about special things that a reviewer should pay attention or things you're not 100% sure about.
Ideally a PR should contain a screenshot of the work or link to the exact page/component/set of changes that have been done.

<Badge text="Bad" type="error"/> 
- `Blank description`
- `Fixes`
- `Logic for auth`

<Badge text="Good"/> 
- `Created a new global search in the admin based on route titles and descriptions.
   This search will always be on top right on every page so it's easy to access. + screenshot`
   
- `Make sure there's no default API url provided in the env and PublicService.js
   This will take effect only on production after we deploy it`   

#### Pull Request Size

An easy to review PR should be small in size. Keeping a PR under `+500` (with exceptions for generated files) diffs is the best in order
to avoid the reviewer missing or skipping important parts or just the PR merge being delayed.

A big PR will also cause a lot of questions and adjustments which might lead to merge conflicts, delays in merging it and other issues. 
If you have a big feature, consider splitting it into multiple chunks rather than opening a huge PR.

#### Formatting

All the code in a PR should be formatted according to the editor or project formatting rules.
A badly formatted PR will be rejected as it's hard to review and understand.

#### Review Preparations

Before asking for review make sure you:
- Formatted your code well
- Removed any redundant logs, debuggers, comments, files.
- Reviewed the PR yourself to double check if you didn't skip anything
- Reviewed the PR against the Netlify link if there's one available
- The PR is up to date with base branch which means no merge conflicts
- The deploy preview (if there is one) is working or tests (if there are any) are passing
- PR is opened against correct branch.
- You've selected the reviewers for review from the right section of the PR

#### Merging

If there are many commits, prefer `Squash and Merge` option from the merge dropdown button.
Make sure to delete branch after merging.

### Commits

Commits should be descriptive. Always use present tense in commit messages.

<Badge text="Bad" type="error"/> 
`wip` `Fixes` `commit` `please make this work`

<Badge text="Good"/> 
- `[TASK-3] Update depedencies`
- `[TASK-12] Implement Modal component`
- `Fix price formatting in Checkout.vue`

### Git Tips

#### Squashing already pushed commits

Use case: You have 4 redundant commits and want to convert them to 1.
- `git reset --soft <commit> (<commit> is the hash of the start commit for squash)`
- `git commit -m "your new message"`
- `git push --force`

#### Cleaning up local branches

After a while, you'll end up with a few stale branches in your local repository.
Branches that don't exist upstream can be cleaned up with `git remote prune origin`
If you want to ensure you're not about to delete something important, add a `--dry-run` flag.

## Pull Request. Code Review.

Pull requests are a feature that makes it easier for developers to collaborate when they are working  on the same project.
In their simplest form, pull requests are a mechanism for a developer to notify team members that they have completed a feature or fixed a bug. Once their feature branch is ready, the developer opens a pull request. This lets everybody involved in the project know that they need to review the code and accept or reject the changes.


### How It Works

1. A developer creates the feature in a dedicated branch in their local repo.
2. The developer pushes the branch to a public repository.
3. The developer creates a pull request.
4. The rest of the team reviews the code, discusses it, and alters it.
5. The developer or reviewer merges the feature into the (main) branch and closes the pull request.


###  Why are we doing code review

The first reason that we are doing code review is to improve the code quality. This practice has positive learning effects on team and company culture.

The first reason that we are doing code review is to improve the code quality. But this practice has positive effects on team and company culture, also. 

By doing code review we want to share knowledge, keep the project consistent and make it easy for new members to join the project.

It is proved that even short and informal code reviews have a significant impact on code quality and bug frequency. Accidental errors can be noticed by the reviewer before merging them in the main branch.


### What to review
There is no correct answer to this question. Each team can have each one approach. As a basic approach, we should check every change that will be merged in the main branch, also we should review both code and functionality.

### Preparing Code for Review

Author is responsible for creating easy to review Pull Requests. 

- PRs should be about one thing. If you do multiple things in one PR, it's hard to review.
- Try to keep the PRs small.
- Having a PR description is useful.
- Ideally, the PR should be finished when submitted. If the PR is work in progress, add (WIP) or [WIP] to the title.
- You should have tests that at least cover the logic, and ideally also cover the input/output parameters and methods. (depends on context)
- Link to the code review from the ticket/story.
- Seek to understand the reviewer's perspective.
- Remember: The primary reviewer is YOU.
- Understand and accept that you will make mistakes.

### Performing Code Reviews

As a reviewer, it is your responsibility to enforce coding standards and keep the quality bar up.

- Offer ways to simplify or improve code.
- Explain your reasons why code should be changed.
- Offer alternative implementations, but assume the author already considered them. ("What do you think about using a custom validator here?")
- Keep in mind the context and the most important thing - does it work?
- Identify ways to simplify the code while still solving the problem.
- Seek to understand the author's perspective.
- Change the status to Approved if  the pull request can be merged.
