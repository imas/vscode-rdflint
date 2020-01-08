import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	// setup setting from enviroment variables
	let javaHome : string | undefined = process.env.JAVA_HOME;
	let rdflintJar : string | undefined = process.env.RDFLINT_JAR;

	// rdflint interactive mode startup command
	let disposable = vscode.commands.registerCommand('rdflint.interactiveMode', () => {
		if (undefined === javaHome) {
			vscode.window.showInformationMessage('Please setup enviroment variable JAVA_HOME');
			return;
		}
		if (undefined === rdflintJar) {
			vscode.window.showInformationMessage('Please setup enviroment variable RDFLINT_JAR');
			return;
		}

		const terminal = vscode.window.createTerminal(`rdflint`, javaHome + "/bin/java", ['-jar', rdflintJar, '-i']);
		terminal.show(true);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
