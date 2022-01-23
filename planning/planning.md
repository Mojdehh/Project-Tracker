# Final Project Planning

### **Project Name:** Project Tracker

### **Team Members:** [Mojdeh](https://github.com/Mojdehh), [Hashim](https://github.com/sharifhashim) & [Taylor](https://github.com/taylornoj)

### **Project Description:** 
Project Tracker is an app to help developers track and communicate the progress of their projects, submit tickets for bugs/features while editing priority and status

### **Target Audience:**
Software developers who want to track their projects

### **Tech Stack:**
- React
- Express
- Node.js
- PostgreSQL
***
### **MVP:**
- Add project
- List all projects
- Edit projects
- Add devs to project
- Report bugs
- Create tickets for new features 
- Priority (Low, Med, High) and status of ticket (open, pending, resolved)
- Ongoing or finished status on a project
- Search feature to search projects/tickets
- Comments on tickets 
- // Stretch: Admin features/abilities 

### **User Stories:**

As a user, I am able to see my dashboard of projects, because I want to see everything I need to work on

As a user, I can create a project, because I want to continue organizing my projects as I start them

As a user, I can assign or add users to a project, so I know who is on the team for a given project

As a user, I can create tickets to report bugs, because we need a bug free project

As a user, I can create tickets to request new features, because clients always request new features along the way

As a user, I can set priority and status of a ticket, because the whole team needs to know which ticket needs to be worked on first

As a user I can search for a specific project, so that I can quickly navigate to find a project

As a user, I can comment on a ticket, so that I can leave notes/updates about the progress of my work

As a user, I can update the status of a project, so that the team is aware if a project is ongoing or is completed for now


### **List of Features:**
- Nav Bar 
- Project Dashboard
- New Project Pop up
- Project Specific Page
- New Ticket Pop up
- Ticket Specific Page
- Comment/Notes Pop up
- Login/User Authentication

****

### **API Routes:**
**Projects:**

GET /api/projects (get list of projects)


POST /api/projects (add to list of projects)


GET /api/projects/:project_id (get specific project)


PUT /api/projects/:project_id (edit specific project)
* adding users to a project?



**Tickets:**

POST /api/project/:project_id/tickets (add to list of tickets of a specific project)


GET /api/project/:project_id/tickets (get tickets for a specific project)


GET /api/project/:project_id/tickets/:ticket_id (get one ticket)


PUT /api/project/:project_id/tickets/:ticket_id (edit one ticket)

**Comments:**

GET /api/project/:project_id/tickets/:ticket_id/comments (list all comments of a specific ticket)


POST /api/project/:project_id/tickets/:ticket_id/comments (add to list of comments of a specific ticket)


PUT /api/project/:project_id/tickets/:ticket_id/comments/:comments_id (edit one comment)

GET /api/user_project/:user_id/:project_id (get user for specific project) ?


### **Routes:**
- "/"
- "/login"
- "/register"
- "/dashboard" => (shows all projects)
- "/project/:project_id" => (shows one project and list of tickets associated with that project)
- "/project/:project_id/ticket/:ticket_id" => specific ticket within a project, with notes listed

### **Trello Board:**
https://trello.com/b/VDhf8QJx/final-project-planning



