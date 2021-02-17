// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HomePanel } from './HomePanel';
import { SidebarProvider } from './SidebarProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"vstodo-sidebar",
			sidebarProvider
		)
	);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-github-projects" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('vscode-github-projects.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		HomePanel.createOrShow(context.extensionUri);
	})
	);

	context.subscriptions.push(vscode.commands.registerCommand('vscode-github-projects.showWarningMessage', () => {
		//warning message
		vscode.window.showWarningMessage("Hey, here's a sample warning message");
	})
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }
