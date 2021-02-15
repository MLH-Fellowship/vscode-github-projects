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



The rest is just auto-generated text check it out:

# vscode-github-projects README

This is the README for your extension "vscode-github-projects". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------
## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
