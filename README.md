# VS Code GitHub Projects
A VS Code extension that brings GitHub's projects into VS Code.  

## Features

Rather than having a separate Kanban board for collaborating on projects separately from GithHub Projects, we created an extension which allows users to fetch repository, organization, and project data from GitHub Projects - this can be edited within VS Code.  

### Feature 1: Sidebar with Checkboxes
- When the user logs in with GitHub, they can select any combination of four options - Personal Profile, Repository, Organization, and can additionally opt to include closed projects.  
- This will pass down the filter criteria to the Projects List Webview which renders all the GitHub projects.

### Feature 2: Navigation
- Each organization has its own header
- We can click on the repository to view more information.  

### Feature 3: Project Info View
- Once we click on a project, we reach the project info view, which has a back button for easier navigation, a link to the GitHub repository, and a Close Project button.  
- We also display each project column (e.g. needs work, in progress, done).  

### Feature 4: Display each column, and easily delete and archive cards. 
- The `Issue` button links us to the GitHub issue website.  

### Feature 5: Add a new column
- The `Add a column` button allows us to add a new column by name, with a confirm/cancel feature.  

## Built with:
- TypeScript
- Svelte
- Rollup
- GitHub API (Apollo GraphQL)

## Contributors

- [Samuel Yuan](https://github.com/yuansamuel)
- [Shrill Shrestha](https://github.com/shrillshrestha)
- [Aitik Gupta](https://github.com/aitikgupta)
- [Dean Gladish](https://github.com/gladishd)

## How to run locally?
- `git` clone https://github.com/Open-Sourced-Olaf/vscode-github-projects.git
- `cd` into the  project folder
- `code .`
- `npm install`
- `npm run webpack`
- fn + F5 (or Launch Extension in command palette)
- Don't forget to sign in with GitHub!  

## How to contribute?
Open a new issue in our extension!  As long as you're in MLH you can make new issues and create pull requests on this project.  

## Release Notes

### 1.0.0

Initial release:  Using generator code (npm install -g yo generator-code) I created a new extension in TypeScript.  We decided to use the Webview API because it allows our extension view to be fully customizable.  Webviews run in isolated contexts that cannot directly access local resources, so we used GQL to query GitHub.  

We're using various lifecycle methods such as updateFilters, kill, revive, dispose, update, and finally we compile our HTML for the webview which is based on TypeScript components.  Using Svelte and Apollo to share our GitHub repository information with our WebView panel, we aimed to create an app which would bring GitHub projects to life in a VS Code-themed way, including Rollup in order to generate an out/compiled folder which is what bundles our project into JavaScript. 

Rollup compiles our code into JS, and we access only the media aspect of the compiled stuff (the extension layer) in order to load content.  And we're using this really cool VS Code API object in order to post new messages and establish connections between the front-end and the extension itself.  

The principal components are the Home, Extension, Sidebar, Sidebar Provider, Project Info, and Project List components.  

-----------------------------------------------------------------------------------------------------------
