# Pull Request. Code Review.

Pull requests are a feature that makes it easier for developers to collaborate when they are working  on the same project.
In their simplest form, pull requests are a mechanism for a developer to notify team members that they have completed a feature or fixed a bug. Once their feature branch is ready, the developer opens a pull request. This lets everybody involved in the project know that they need to review the code and accept or reject the changes.


## How It Works

1. A developer creates the feature in a dedicated branch in their local repo.
2. The developer pushes the branch to a public repository.
3. The developer creates a pull request.
4. The rest of the team reviews the code, discusses it, and alters it.
5. The developer or reviewer merges the feature into the (main) branch and closes the pull request.


##  Why are we doing code review

The first reason that we are doing code review is to improve the code quality. This practice has positive learning effects on team and company culture.

The first reason that we are doing code review is to improve the code quality. But this practice has positive effects on team and company culture, also. 

By doing code review we want to share knowledge, keep the project consistent and make it easy for new members to join the project.

It is proved that even short and informal code reviews have a significant impact on code quality and bug frequency. Accidental errors can be noticed by the reviewer before merging them in the main branch.


## What to review
There is no correct answer to this question. Each team can have each one approach. As a basic approach, we should check every change that will be merged in the main branch, also we should review both code and functionality.

## Preparing Code for Review

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

## Performing Code Reviews

As a reviewer, it is your responsibility to enforce coding standards and keep the quality bar up.

- Offer ways to simplify or improve code.
- Explain your reasons why code should be changed.
- Offer alternative implementations, but assume the author already considered them. ("What do you think about using a custom validator here?")
- Keep in mind the context and the most important thing - does it work?
- Identify ways to simplify the code while still solving the problem.
- Seek to understand the author's perspective.
- Change the status to Approved if  the pull request can be merged.
