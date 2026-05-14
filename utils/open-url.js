import { spawn } from "node:child_process";
import Open from "open";

function escapeForPowerShell(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

// open v11 resolves on 'spawn' on Windows; Node exits before PowerShell
// dispatches the URL and the orphan PS gets torn down, so the browser
// never opens. Await 'close' so the parent stays alive through Start-Process.
export default function openUrl(url) {
  if (process.platform !== "win32") {
    return Open(url);
  }
  const ps = `${process.env.SYSTEMROOT || "C:\\Windows"}\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`;
  const cmd = `$ProgressPreference='SilentlyContinue'; Start ${escapeForPowerShell(url)}`;
  const b64 = Buffer.from(cmd, "utf16le").toString("base64");
  const child = spawn(
    ps,
    ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-EncodedCommand", b64],
    { stdio: "ignore", windowsVerbatimArguments: true },
  );
  return new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("close", (code, signal) => {
      code === 0 ? resolve() : reject(new Error(`PowerShell exited with code ${code} signal ${signal}`));
    });
  });
}
