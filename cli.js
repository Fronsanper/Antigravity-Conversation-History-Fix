#!/usr/bin/env node
/**
 * Antigravity History Fix CLI
 * v1.0.0 — By Fronsanper
 */
const path = require("path");
const fs = require("fs");

const fixes = {
  "auto-run": {
    script: path.join(__dirname,"fixes","auto-run-fix","patch.js"),
    description: "Fix the Always Proceed terminal policy"
  },
  "link-approval": {
    script: path.join(__dirname,"fixes","link-approval-fix","patch.js"),
    description: "Skip external-link confirmation prompts"
  }
};

const args=process.argv.slice(2);
const fixName=args[0];
const flags=args.slice(1);

console.log("\nAntigravity History Fix v1.0.0");
console.log("By Fronsanper\n");

if(!fixName || ["--help","-h"].includes(fixName)){
  console.log("Available fixes:");
  for(const [name,fix] of Object.entries(fixes)) console.log(`  ${name.padEnd(18)} ${fix.description}`);
  console.log("\nUsage:");
  console.log("  npx antigravity-history-fix <fix-name>");
  console.log("  npx antigravity-history-fix <fix-name> --check");
  console.log("  npx antigravity-history-fix <fix-name> --revert");
  console.log("  npx antigravity-history-fix <fix-name> --path <dir>");
  console.log("\nGUI wizard: npm run wizard");
  process.exit(0);
}
const fix=fixes[fixName];
if(!fix){console.error(`Unknown fix: ${fixName}`);process.exit(1)}
if(!fs.existsSync(fix.script)){console.error(`Fix script not found: ${fix.script}`);process.exit(1)}
process.argv=[process.argv[0],fix.script,...flags];
require(fix.script);
