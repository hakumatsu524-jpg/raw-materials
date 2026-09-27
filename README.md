# Raw Pad

Raw Pad is a dependency-free Node.js toolkit for building a **commodity-themed memecoin launchpad**. It creates launch-ready token metadata by pairing materials such as toilet paper + wood, paper + copper, or cotton + wheat.

![Raw Pad logo](./public/raw-materials-logo.png)

> **Scope:** This repository provides launchpad metadata and validation primitives. It does not deploy contracts, custody funds, execute trades, or provide investment advice. Add chain-specific contracts, wallet flows, moderation, and compliance controls before handling real assets.

## What it does

- Maintains a searchable catalog of raw-material commodities.
- Pairs two different commodities into a unique launch concept.
- Generates a deterministic token name, ticker, categories, and description.
- Provides a small library that can power a web or command-line launchpad.
- Keeps blockchain execution out of the core so a chain adapter can be added deliberately.

## Requirements

- Node.js 20 or newer
- No external runtime dependencies

## Install

```bash
npm install
```

## CLI usage

List launchpad materials:

```bash
node src/raw-materials.js list
```

Generate a launch candidate:

```bash
node src/raw-materials.js pair "toilet paper" wood
```

Example output:

```json
{
  "id": "toilet-paper-wood",
  "name": "Toilet Paper + Wood",
  "ticker": "TPWOOD",
  "commodities": ["toilet-paper", "wood"],
  "categories": ["paper", "timber"],
  "description": "A community-created launch candidate pairing toilet paper with wood.",
  "launchStatus": "draft",
  "disclaimer": "Launch metadata only. This tool does not deploy, sell, or promote a financial asset."
}
```

## Use as a library

```js
const { createLaunchCandidate } = require('./src/raw-materials')

const candidate = createLaunchCandidate('paper', 'copper', {
  name: 'Paper Hands Copper',
  ticker: 'PHCU',
  description: 'A community launch candidate for paper and copper.'
})

console.log(candidate)
```

## Development

Run tests:

```bash
npm test
```

Supported materials currently include toilet paper, paper, wood, copper, steel, rubber, cotton, and wheat. Add entries to the `commodities` array in `src/raw-materials.js` to extend the catalog.

## Building a chain adapter

Keep `createLaunchCandidate` as the deterministic metadata layer, then implement a separate adapter for your target chain. That adapter should validate wallet ownership, token supply, fees, slippage, permissions, and transaction results server-side. Never place private keys or signing secrets in a client application.

## License

MIT. See `LICENSE` if included by the repository owner.
