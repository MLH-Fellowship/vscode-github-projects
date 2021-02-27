// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HomePanel } from './HomePanel';
import { SidebarProvider } from './SidebarProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const sidebarProvider = new SidebarProvider(context.extensionUri, context);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"vsc-github-projects",
			sidebarProvider
		)
	);

	context.subscriptions.push(vscode.commands.registerCommand('vscode-github-projects.revelProjects', () => {
		// The code you place here will be executed every time your command is executed
		HomePanel.createOrShow(context.extensionUri, {});
	})
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }
