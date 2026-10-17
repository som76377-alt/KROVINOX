# Ruflo agent-team setup

Ruflo is an external agent-orchestration runtime for supported coding-agent clients, not a website dependency. Official project and current setup instructions: https://github.com/ruvnet/ruflo.

## Current setup path

This repository includes `.mcp.json` for a local stdio Ruflo server and `scripts/setup-ruflo.sh` to launch the official project setup wizard.

Prerequisites:
- Node.js and npm.
- A supported local client, such as Codex or Claude Code.
- Any required model-provider credentials configured privately in that client.

From the repository root, run:

```sh
bash scripts/setup-ruflo.sh
```

The script runs the upstream setup wizard. After setup, restart the supported client so it can read the Ruflo configuration. For clients using local stdio MCP, Ruflo's documented server command is `npx -y ruflo@latest mcp start`, matching the command in `.mcp.json`.

Claude Code users should follow the current upstream plugin instructions and review any plugins or mods before enabling them. Ruflo integrations run with the permissions of the configured client.

## Intended specialist responsibilities

- **Design researcher**: gather real fashion e-commerce references and explain specific layout choices with links.
- **Storefront builder**: implement the approved direction and responsive navigation.
- **Merchandising reviewer**: verify product truth, image context, and CTA destinations.
- **Quality critic**: audit typography, spacing, scale, alignment, contrast, responsive behavior, keyboard access, and screenshots.
- **Release verifier**: run lint, typecheck, build, browser tests, and inspect fresh screenshots.

The Ruflo runtime has **not** been launched from this chat. The team brief describes intended roles, not proof that agents are active. Do not report a Ruflo-built change until the configured client actually runs it.
