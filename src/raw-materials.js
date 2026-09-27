#!/usr/bin/env node

const commodities = [
  { id: 'toilet-paper', name: 'Toilet Paper', symbol: 'TP', category: 'paper', aliases: ['toilet paper', 'tissue', 'bathroom paper'] },
  { id: 'paper', name: 'Paper', symbol: 'PPR', category: 'paper', aliases: ['paper', 'office paper', 'cardstock'] },
  { id: 'wood', name: 'Wood', symbol: 'WOOD', category: 'timber', aliases: ['wood', 'lumber', 'timber'] },
  { id: 'copper', name: 'Copper', symbol: 'CU', category: 'metal', aliases: ['copper'] },
  { id: 'steel', name: 'Steel', symbol: 'STL', category: 'metal', aliases: ['steel'] },
  { id: 'rubber', name: 'Rubber', symbol: 'RBR', category: 'industrial', aliases: ['rubber'] },
  { id: 'cotton', name: 'Cotton', symbol: 'CTN', category: 'fiber', aliases: ['cotton'] },
  { id: 'wheat', name: 'Wheat', symbol: 'WHT', category: 'agriculture', aliases: ['wheat'] },
]

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function findCommodity(input) {
  const normalized = input.toLowerCase().trim()
  return commodities.find((item) => item.id === normalized || item.name.toLowerCase() === normalized || item.aliases.includes(normalized))
}

function tickerFor(first, second) {
  return `${first.symbol}${second.symbol}`.slice(0, 8)
}

function createPair(firstInput, secondInput, options = {}) {
  const first = findCommodity(firstInput)
  const second = findCommodity(secondInput)
  if (!first || !second) throw new Error(`Unknown commodity. Use list to see supported commodities.`)
  if (first.id === second.id) throw new Error('Choose two different commodities.')

  const [left, right] = [first, second].sort((a, b) => a.id.localeCompare(b.id))
  const name = options.name || `${left.name} + ${right.name}`
  const ticker = (options.ticker || tickerFor(left, right)).toUpperCase()
  return {
    id: slugify(`${left.id}-${right.id}`),
    name,
    ticker,
    commodities: [left.id, right.id],
    categories: [left.category, right.category],
    description: options.description || `A community-created memecoin concept pairing ${left.name.toLowerCase()} with ${right.name.toLowerCase()}.`,
    disclaimer: 'Concept metadata only. This tool does not create, deploy, sell, or promote a financial asset.',
  }
}

function listCommodities() {
  return commodities.map(({ id, name, symbol, category }) => ({ id, name, symbol, category }))
}

module.exports = { commodities, createPair, findCommodity, listCommodities }

if (require.main === module) {
  const [, , command, first, second] = process.argv
  try {
    if (command === 'list') console.log(JSON.stringify(listCommodities(), null, 2))
    else if (command === 'pair') console.log(JSON.stringify(createPair(first, second), null, 2))
    else {
      console.error('Usage: raw-materials list | raw-materials pair <commodity-a> <commodity-b>')
      process.exitCode = 1
    }
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
