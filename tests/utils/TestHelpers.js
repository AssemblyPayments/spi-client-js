export function getLastConsoleCallArgs(functionName = "info") {
  if (console[functionName].calls) {
    const lastCall = console[functionName].calls.mostRecent().args[0];
    return functionName !== "error" ? lastCall.toLowerCase() : lastCall;
  } else
    throw new Error(
      "Use Jasmine's spyOn method to spy on console.functionName before using getLastConsoleCallArgs"
    );
}
