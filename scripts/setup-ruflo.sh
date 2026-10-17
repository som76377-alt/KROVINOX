#!/usr/bin/env bash
set -euo pipefail
npx ruflo@latest init
npx ruflo@latest doctor
npx ruflo@latest swarm init --topology hierarchical --max-agents 6 --strategy specialized
npx ruflo@latest agent spawn -t researcher --name design-researcher
npx ruflo@latest agent spawn -t coder --name storefront-builder
npx ruflo@latest agent spawn -t reviewer --name quality-critic
npx ruflo@latest agent list
