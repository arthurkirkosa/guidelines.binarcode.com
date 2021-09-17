---
title: Testing Procedures
description: ''
position: 3
category: 'Procedures'
---

Procedure to test a project. Technical and management aspects.

## Setup for projects already in progress or for new projects
- [x] Requirements analysis: In this step, the new feature requirements are analysed (documentation if existing is carefully read) and all unclear aspects are discussed with the development team
- [x] Setup: Access to the project management tool(Jira), Access to backend testing tools (Postman); Access to the source code if necessary;  Setup for multiple devices/OS/browsers; Getting the credentials for different environments etc
- [x] Test Case Creation: Test steps, test data, preconditions, postconditions
- [x] A smoke test is performed


## Testing a new feature added to the project: unit and integration testing 
- [x] After one component is tested isolated from the environment, integration testing is performed
- [x] Jira project's board is checked a few times per day, to see if any new features are marked as "Ready for QA"
- [x] When the development team is marking a task or a fixed bug as "Ready for QA" (after the changes are deployed on the dev environment), the tickets are moved in "QA- In Progress"(in Jira) and the actual testing is started, mostly using manual procedures
- [x] In case of passing tests, the status of the ticket is changed to DONE.
- [x] In case of failing tests, the issue must be identified as related to Back End or Front End and returned to the corresponding development team. Add comments with expected vs actual results, summary and description of the incident, attach all the necessary files in order to help the development team to identify the cause of failure: screenshots (with the issue if is visible on frontend), console error, or network tab errors, videos with the all flow leading to the bug, logs, etc.). 


## Reporting an incident
- [x] When exploring new features implementation or during exploratory testing, in case of finding that an actual result is different than an expected result, an incident/bug report is filled in Jira.
- [x] The bug report contains the following information: Summary of the defect;  Detailed description of the defect; Steps to reproduce, Actual Result and Expected Results, Attachments(videos, screenshots, logs, etc), Severity and Priority;  
- [x] The bug is assigned to a Frontend's or Backend's team member depending on the nature of the bug. In case of ambiguity is assigned to the PM which will assign to the right department.
- [x] After a bug/incident is marked as resolved, retesting is absolutely necessary in order to establish if it was indeed fixed.
- 

## Regression Testing: A very important step after testing or re-testing a feature/bug 
- [x] After a bug/task is marked as "Ready for QA" and is re-tested, all the components that might be affected by it, are also re-tested. 
- [x] In case of discrepancies between expected vs actual results, the tickets are either returned to the development team or new tickets are raised 