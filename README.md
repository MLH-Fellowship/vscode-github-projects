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

## Extension Settings

To customize languages we support for inline snippet completion, icon-color and icon-size for hover preview

- Navigate to extension settings
- Choose ```Extension Settings```
- From here, you can customize ```getSvgIcons.iconColor```, ```getSvgIcons.iconSize``` and ```getSvgIcons.selector```

## Icon source
- [Bootstrap Icons](https://github.com/twbs/icons)

## Prefixes

| Prefix         | SVG Icons                           | Version |
|----------------|-------------------------------------|---------|
| `icon-`           | Bootstrap Icons              | 1.0     |

## Contributors

- [Bodhisha Thomas](https://github.com/bodhisha)
- [Marco Chan](https://github.com/m2chan)
- [Rashi Sharma](https://github.com/rashi-s17)
- [Steven Tey](https://github.com/steven-tey)
- [Sumi Kolli](https://github.com/sgkolli535)

## How to run locally?
- git clone

  ```git clone https://github.com/Open-Sourced-Olaf/Get-svg-icons.git```
- Install node dependencies with ```npm install```
- Open project with VS Code
- Press F5 or run Launch Extension in the debug window or run ```npm run compile```

## How to contribute?
Take a look at the [contribution guidelines](https://github.com/Open-Sourced-Olaf/Get-svg-icons.git
) and open a [new issue](https://github.com/Open-Sourced-Olaf/Get-svg-icons/issues) or [pull request](https://github.com/Open-Sourced-Olaf/Get-svg-icons/pulls) on GitHub.

## Release Notes

### 1.0.0

Initial release of the extension

-----------------------------------------------------------------------------------------------------------

## Blockers

In one sentence: A VS Code extension that brings GitHub's projects into VS Code.

How did I make this repository?  You know.

Step 1: npm install -g yo generator-code
Step 2: yo code (it'll ask you a bunch of questions.  Scroll with the arrow keys!)

What did I select?

I selected **New Extension (TypeScript)**, **vscode-github-projects** as the extension name, vscode-github-projects as the extension identifier, I did set specific description text which you can see in package.json "description".

I said Yes to initialize a git repository, No to "bundle the source code with webpack", and **npm** as the package manager to use.

Currently I just registered a test warning message in extension.js, and in package.json I added the message to **activationEvents** and **contributes/commands**.

How to run in VS Code?  fn + F5 to open a new Extension Development Host window.

⌘ + Shift + P to get Command Palette, in which we can do **Developer: Reload Window** to get saved changes, OR commands such as **Hello World**.


Using TypeScript (because we added Svelte later on), we aimed to create an app which would bring GitHub projects to life!  We started off with the basics such as registering commands in the base src/extension.ts file and then describing activation events and contributes/commands in package.json, and then proceeded to refactor things.  Specifically, Shrill refactored the command function to make it more concise.  

We also have our own custom CSS except it’s ONLY for the native VS Code themes.  We were inspired by this sick VSinder app which is for developers to share code but in our case we’re just using Svelte and Apollo GraphQL to share our GitHub repository information with our WebView panel.  We’re also using all types of lifecycle methods such as update() and we’re not hardcoding our HTML page in src/HomePanel.ts and instead are just importing them from different Svelte components.  
We also made this really awesome Nonce feature it’s like a one-time authentication thing where you generate a one-time code.  

When we were building src/HomePanel.ts I distinctly remember that one time he made it so that we could join paths with the out/compiled folder.  I feel like once we got out/compiled truly set up with different TS files, originating from Svelte, compiled by Rollup - that’s what really got us going.  

So, we started out with that and then built in some lifecycle functions into our HomePanel such as kill() and revive().  

