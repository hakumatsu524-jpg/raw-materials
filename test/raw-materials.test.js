const test = require('node:test')
const assert = require('node:assert/strict')
const { createLaunchCandidate, createPair, listCommodities } = require('../src/raw-materials')

test('lists supported commodities', () => {
  assert.ok(listCommodities().some((item) => item.id === 'wood'))
})

test('creates a deterministic commodity pair', () => {
  const pair = createPair('toilet paper', 'wood')
  assert.equal(pair.id, 'toilet-paper-wood')
  assert.equal(pair.ticker, 'TPWOOD')
  assert.deepEqual(pair.commodities, ['toilet-paper', 'wood'])
  assert.equal(pair.launchStatus, 'draft')
})

test('exposes launch candidate API', () => {
  assert.equal(createLaunchCandidate('paper', 'copper').launchStatus, 'draft')
})

test('rejects duplicate commodities', () => {
  assert.throws(() => createPair('paper', 'paper'), /different commodities/)
})
