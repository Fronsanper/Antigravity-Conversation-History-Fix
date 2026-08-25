# Antigravity History Fix

**v1.0.0 — By Fronsanper**

A guided, community-oriented toolkit for applying and reverting Antigravity fixes without requiring users to understand every technical detail.

> **Unofficial project:** this software is not affiliated with or endorsed by Google or the Antigravity team.

## What it does

The project retains the existing patch engines and wraps them in a new visual setup wizard.

Included fixes:

- **Auto-Run Fix:** restores automatic execution for the Antigravity “Always Proceed” terminal policy when the installed version matches the tested range.
- **Link Approval Fix:** optionally bypasses the external-link confirmation step.

The second feature is optional because removing a confirmation dialog changes a security-related user interaction.

## Windows support

**Yes. Windows is supported.** The wizard can automatically detect the common Windows Antigravity installation location under `%LOCALAPPDATA%\Programs\Antigravity`.

The project also includes:

- `Start-Antigravity-History-Fix.cmd`
- `start-antigravity-history-fix.ps1`

The `.cmd` launcher is intended to be the simplest option for Windows users and can be used as the target of a desktop shortcut.

## Requirements

- Node.js **16 or newer**
- A supported Antigravity installation
- Permission to modify the Antigravity installation files
- Close Antigravity before applying or reverting patches when possible

The patch engine currently checks Antigravity versions before applying the fixes. It does not blindly patch unsupported versions unless a user explicitly uses the underlying CLI's force behavior where available.

## Quick start

1. Install Node.js 16+.
2. Extract the project ZIP.
3. On Windows, double-click `Start-Antigravity-History-Fix.cmd`.
4. The wizard opens in your default browser.
5. Choose PT-BR or EN-US.
6. Read the explanation and terms.
7. Select the desired fixes.
8. Apply the changes.
9. Restart Antigravity.

Technical users can also run:

```bash
npm install
npm run wizard
```

Or use the CLI:

```bash
node cli.js --help
node cli.js auto-run
node cli.js auto-run --check
node cli.js auto-run --revert
```

## Uninstall / revert

Use the **Uninstall / revert** area of the wizard to restore available `.ba-backup` files. This removes the patch changes without removing Antigravity itself.

Uninstalling the wizard package is separate: simply delete this project folder after reverting changes.

## Languages

The wizard ships with:

- `locales/pt-BR.json`
- `locales/en-US.json`

User-facing wizard text is loaded from these locale files so the interface can be maintained in both languages without changing the patch engine.

## Project layout

```text
.
├─ fixes/                 # Working patch engines
├─ src/                   # Extension integration
├─ wizard/                # Visual local setup wizard
├─ locales/               # PT-BR and EN-US strings
├─ Start-Antigravity-History-Fix.cmd
├─ start-antigravity-history-fix.ps1
├─ start-antigravity-history-fix.sh
├─ cli.js
├─ package.json
├─ LICENSE
├─ LEGAL.md
└─ CHANGES.md
```

## For beginners

The safest path is the graphical wizard. It explains what each step does and creates backups before patching.

You do not need to edit source code to use the project.

## For advanced users

The patch engines use structural matching against minified Antigravity bundles instead of depending only on local variable names. Version checks prevent normal application on unsupported versions, and each patch can be reverted.

## Development

```bash
npm install
npm run build
npm run wizard
```

## Distribution

This project is licensed under **AGPL-3.0-or-later**. Preserve the license and required legal notices when redistributing modified versions.

## Contributing

Bug reports, compatibility reports and pull requests are welcome. When contributing a patch, prefer structural matching, explicit version checks and reversible changes.
