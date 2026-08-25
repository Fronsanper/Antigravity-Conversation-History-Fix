# v1.0.0 — Antigravity History Fix

This release keeps the working patch engines while adding a new guided interface and packaging layer.

## Added

- Visual local setup wizard.
- PT-BR and EN-US interface resources.
- Welcome, explanation, terms/privacy, selection, apply, cancel and completion screens.
- Revert/uninstall area.
- Windows `.cmd` launcher plus PowerShell and POSIX launcher scripts.
- User-facing branding: **Antigravity History Fix** and **By Fronsanper**.
- Clickable Discord, Telegram, YouTube and GitHub names in the application UI.
- Standalone build fallback for `antigravity-sdk` when the package is installed from npm instead of a sibling monorepo.

## Preserved

The patch implementation in `fixes/` is intentionally kept intact except for surrounding packaging/branding. Existing structural matching, version checks, backups and revert behavior are preserved.
