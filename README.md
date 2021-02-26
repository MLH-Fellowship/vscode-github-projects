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



# Get Svg Icons
View icons from bootstrap's icon library and insert them into your code through snippets.

## Installation

- Go to VS Marketplace https://marketplace.visualstudio.com/items?itemName=marcochan.get-svg-icons to install the extension

## Features

### Side Panel with customizable icons

- Side Panel with around 1300+ icons
- Users can search for the icon-name (or tags associated with it) and choose the desired icon
- On clicking on the icon, corresponding svg code will be inserted at the last active position on the code editor
- Users can change the height and width of the svg directly from the side panel
![demo](https://github.com/Open-Sourced-Olaf/Get-svg-icons/blob/staging/screenshots/side-panel.gif)

### Inline Icon suggestions

- Type "icon-" (without quotes) to start auto-completing icons. If the icon preview is not showing up (as shown in the GIF below), press Ctrl+Space (default hotkey) or press the  ">" icon to expand the details view.
- An inline replacement of the selected icon with its svg will be done.
![demo](https://github.com/Open-Sourced-Olaf/Get-svg-icons/blob/staging/screenshots/inline_icon_completion.gif)

### Icon preview on hover
- On hovering over the svg code (class name) , you can preview the icon of the corresponding svg snippet

## Built with:
- Typescript
- VS Code API
- Python for web-scraping

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
- Clone the repository

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


