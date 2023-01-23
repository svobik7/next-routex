#!/usr/bin/env node
const arg = require('arg')

const commonArgs = {
  // Flags
  '--version': Boolean,
  '--help': Boolean,
  '--inspect': Boolean,
  '--env': String,

  // Aliases
  '-v': '--version',
  '-h': '--help',
  '-e': '--env',
}

const args = arg(commonArgs, {
  permissive: true,
})

export type CliCommand = (argv?: string[]) => void

const commands = {
  generate: () => import('./commands/generate').then((i) => i.generate),
}

const aliases: Record<string, keyof typeof commands> = {
  g: 'generate',
}

type Command = keyof typeof commands
type Alias = keyof typeof aliases

let lintelCommand: Command | undefined

if (commands[args._[0] as Command]) {
  lintelCommand = args._[0] as Command
}

if (aliases[args._[0] as Alias]) {
  lintelCommand = aliases[args._[0] as Alias]
}

const forwardedArgs = lintelCommand ? args._.slice(1) : args._

async function main() {
  // Make sure commands gracefully respect termination signals (e.g. from Docker)
  process.on('SIGTERM', () => process.exit(0))
  process.on('SIGINT', () => process.exit(0))

  if (lintelCommand) {
    const commandFn = commands[lintelCommand]
    commandFn?.()
      .then((exec: any) => exec(forwardedArgs))
      .then(() => {
        process.exit(0)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

main().catch((e) => {
  console.error(e)
})
