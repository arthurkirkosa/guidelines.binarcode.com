---
title: Project Kick Off
description: 'A project kick-off meeting is the first meeting with the project team and the client of the project where applicable. This meeting is the time to establish common goals and the purpose of the project.'
position: 6
category: 'Procedures'
tehnicalMeetingList:
- First technical meeting with project stakeholders
- Check design and other technical requirements
- Clarify every backlog question
- Make sure every single requirement is covered in the estimation
managementList:
- Who is the main project person?
- Team members (50% API, 50% SPA/Nuxt)
- Team leaders
jiraList:
- Setup Jira Project
- Create a Roadmap
- Create few stories for the first roadmap item
communicationList:
- Setup Slack workspace or chanel for technical discussions
- Having a private channel for management discussions
sprintList:
- Create event calendar
- Send a reminder email to all participants with meeting Agenda
- In the meeting present the project Roadmap
- Make sure stakeholders understand notions as <code>epic, story, task, bug</code>
- Create the first sprint, it could only contain stories, not necessary tasks
- Make sure no one has more questions
- After the meeting send a Follow-Up email to thank everyone for attendance and reminder everyone what they have to do in the current sprint
---


Procedure to start a new project. Technical and management aspects.

## Kick Off first technical meeting
<base-list :list="tehnicalMeetingList"></base-list>

## Management
<base-list :list="managementList"></base-list>

## Jira
<base-list :list="jiraList"></base-list>

## Communication
<base-list :list="communicationList"></base-list>

## First sprint
<base-list :list="sprintList"></base-list>




