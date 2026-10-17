# Ruflo agent-team setup

Ruflo is an external agent-orchestration runtime, not a normal website dependency. Official project: https://github.com/ruvnet/ruflo. Quick start: https://github.com/ruvnet/ruflo/wiki/Quick-Start.

## Prerequisites
- Node.js 20 or newer and npm.
- A compatible local agent client and model-provider credentials configured privately.
- Never commit API keys or local secrets.

## Initialize from the repository root
```sh
npx ruflo@latest init
npx ruflo@latest doctor
npx ruflo@latest swarm init --topology hierarchical --max-agents 6 --strategy specialized
npx ruflo@latest agent spawn -t researcher --name design-researcher
npx ruflo@latest agent spawn -t coder --name storefront-builder
npx ruflo@latest agent spawn -t reviewer --name quality-critic
npx ruflo@latest agent list
```

This setup has not been run in GitHub Actions. Do not report a swarm as active until the doctor passes and the agent list confirms the workers. The current chat environment can edit GitHub files and inspect CI artifacts, but cannot claim that a local Ruflo runtime was started.

## Team responsibilities
- Researcher: collect concrete reference patterns and cite URLs.
- Builder: implement responsive, accessible Next.js UI.
- Merchandising reviewer: verify product truth, image relevance, and CTA behavior.
- Quality critic: audit typography, spacing, scale, alignment, contrast, mobile layout, and screenshot evidence.
- Release verifier: run tests and inspect fresh desktop/mobile screenshots.
