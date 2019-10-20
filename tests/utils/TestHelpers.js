export function getLastConsoleCallArgs(functionName = 'info') {
    if (console[functionName].calls)
        return console[functionName].calls.mostRecent().args[0].toLowerCase();
    else
        throw 'Use Jasmine\'s spyOn method to spy on console.functionName before using getLastConsoleCallArgs';
}
