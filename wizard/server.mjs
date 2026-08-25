import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const port = Number(process.env.ANTIGRAVITY_MANAGER_PORT || 0);

const common = {
  name: "Antigravity History Fix",
  version: "1.0.0",
  by: "Fronsanper",
  links: {
    Discord: "https://discord.com/invite/z5gb4zvWsY",
    Telegram: "https://t.me/+Ygtl-pe64d5jN2Nh",
    YouTube: "https://www.youtube.com/@FronsanperOfficial",
    GitHub: "https://github.com/Fronsanper"
  }
};

function detectPaths() {
  const candidates = [];
  if (process.platform === "win32") {
    if (process.env.LOCALAPPDATA) candidates.push(path.join(process.env.LOCALAPPDATA, "Programs", "Antigravity"));
    if (process.env.ProgramFiles) candidates.push(path.join(process.env.ProgramFiles, "Antigravity"));
    if (process.env["ProgramFiles(x86)"]) candidates.push(path.join(process.env["ProgramFiles(x86)"], "Antigravity"));
  } else {
    candidates.push(path.join(os.homedir(), ".antigravity"));
    candidates.push("/Applications/Antigravity.app/Contents/Resources/app");
    candidates.push("/opt/Antigravity");
  }
  return [...new Set(candidates)].filter(p => fs.existsSync(p));
}

function json(res, data, status = 200) {
  res.writeHead(status, {"Content-Type":"application/json; charset=utf-8"});
  res.end(JSON.stringify(data));
}
function runScript(script, args = []) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [script, ...args], {
      cwd: projectRoot,
      env: process.env,
      windowsHide: true
    });
    let out = "", err = "";
    child.stdout.on("data", b => out += b.toString());
    child.stderr.on("data", b => err += b.toString());
    child.on("close", code => resolve({code, out, err}));
    child.on("error", e => resolve({code: -1, out, err: String(e)}));
  });
}

async function handle(req, res) {
  const u = new URL(req.url, "http://127.0.0.1");
  if (u.pathname === "/api/info") {
    return json(res, { ...common, platform: process.platform, node: process.version, detectedPaths: detectPaths() });
  }
  if (u.pathname === "/api/apply" && req.method === "POST") {
    let body = "";
    req.on("data", c => body += c);
    req.on("end", async () => {
      try {
        const data = JSON.parse(body || "{}");
        const results = [];
        for (const fix of Array.isArray(data.fixes) ? data.fixes : []) {
          const script = fix === "auto-run"
            ? path.join(projectRoot, "fixes", "auto-run-fix", "patch.js")
            : fix === "link-approval"
              ? path.join(projectRoot, "fixes", "link-approval-fix", "patch.js")
              : null;
          if (!script || !fs.existsSync(script)) continue;
          const args = data.customPath ? ["--path", data.customPath] : [];
          results.push({fix, ...(await runScript(script, args))});
        }
        return json(res, {ok:true, results});
      } catch (e) {
        return json(res, {ok:false, error:String(e)}, 400);
      }
    });
    return;
  }
  if (u.pathname === "/api/revert" && req.method === "POST") {
    const results = [];
    for (const fix of ["auto-run", "link-approval"]) {
      const script = fix === "auto-run"
        ? path.join(projectRoot, "fixes", "auto-run-fix", "patch.js")
        : path.join(projectRoot, "fixes", "link-approval-fix", "patch.js");
      if (fs.existsSync(script)) results.push({fix, ...(await runScript(script, ["--revert"]))});
    }
    return json(res, {ok:true, results});
  }
  if (u.pathname === "/") {
    const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
    res.writeHead(200, {"Content-Type":"text/html; charset=utf-8", "Cache-Control":"no-store"});
    res.end(html.replaceAll("__MANAGER_VERSION__", common.version));
    return;
  }
  const safe = u.pathname.replace(/^\/+/, "");
  const localeFile = path.join(projectRoot, safe);
  if (safe.startsWith("locales/") && fs.existsSync(localeFile)) {
    res.writeHead(200, {"Content-Type":"application/json; charset=utf-8", "Cache-Control":"no-store"});
    return res.end(fs.readFileSync(localeFile));
  }
  res.writeHead(404); res.end("Not found");
}

const server = http.createServer((req,res) => {
  Promise.resolve(handle(req,res)).catch(e => json(res,{ok:false,error:String(e)},500));
});
server.listen(port || 0, "127.0.0.1", () => {
  const address = server.address();
  const actualPort = typeof address === "object" ? address.port : port;
  const url = `http://127.0.0.1:${actualPort}/`;
  console.log(`Antigravity History Fix v${common.version}`);
  console.log(`Wizard: ${url}`);
  const opener = process.platform === "win32" ? ["cmd", ["/c", "start", "", url]]
    : process.platform === "darwin" ? ["open", [url]]
    : ["xdg-open", [url]];
  try { spawn(opener[0], opener[1], {detached:true, stdio:"ignore"}).unref(); } catch {}
});
