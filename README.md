# VS Code GitHub Projects
A VS Code extension that brings GitHub's projects into VS Code.  

## Features

Instead of having a separate Kanban board where you can collaborate on projects but cannot directly translate this to a GitHub Projects board, we decided to create an extension which allows users to fetch repository, organization, and open/closed project data from GitHub Projects and edit them within VS Code (delete/modify/add new).  

### Feature 1: Sidebar with Checkboxes to filter between Personal Profile, Repository, Organization, and Including Closed Projects
- Once the user is logged in with GitHub, they can select any combination of the above four options
- This will pass down the filter criteria to the Webview component which renders all the GitHub projects.

### Feature 2: Navigation
- Repositories are organized under each header which represents an organization.  
- Can click on repository to view more information.  

### Feature 3: Project Info View
- Each project info view has a back button for easier navigation. 
- We can also view the project on GitHub. 
- Our extension allows us to more easily close the project than on the actual GitHub projects page. 

### Feature 4: Display each column, and easily delete and archive cards. 
- If we click on `Issue` we will be taken to the corresponding issue on GitHub.  

### Feature 5: Add a new column
- Can add new column by name, with confirmation/cancel feature. 

## Built with:
- TypeScript
- Svelte
- Rollup
- GitHub API (Apollo GraphQL)

## Icon source
- [Codicons](https://microsoft.github.io/vscode-codicons/dist/codicon.html)

## Contributors

- [Samuel Yuan] (https://github.com/yuansamuel)
- [Shrill Shrestha] (https://github.com/shrillshrestha)
- [Aitik Gupta] (https://github.com/aitikgupta)
- [Dean Gladish] (https://github.com/gladishd)

## How to run locally?
- git clone https://github.com/Open-Sourced-Olaf/vscode-github-projects.git
- npm install
- npm run watch
- code .
- fn + F5 (or Launch Extension in command palette)
- Don't forget to sign in with GitHub!  

## How to contribute?
Open a new issue in our extension!  As long as you're in MLH you can make new issues and create pull requests on this project.  

## Release Notes

### 1.0.0

Initial release. using generator code (npm install -g yo generator-code) I created a new extension in TypeScript.  We decided to use the Webview API because it allows our extension view to be fully customizable.  Webview run in isolated contexts that cannot directly access local resources, so we used GQL to query GitHub.  

We're using various lifecycle methods such as updateFilters, kill, revive, dispose, update, and finally we compile our HTML for the webview which is based on TypeScript components.  Using Svelte and Apollo to share our GitHub repository information with our WebView panel, 

We aimed to create an app which would bring GitHub projects to life in a VS Code-themed way, including Rollup in order to generate an out/compiled folder which is what bundles our project into JavaScript.  

-----------------------------------------------------------------------------------------------------------
