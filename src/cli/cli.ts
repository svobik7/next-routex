#!/usr/bin/env node
import arg from 'arg'

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

let routexCommand: Command | undefined

if (commands[args._[0] as Command]) {
  routexCommand = args._[0] as Command
}

if (aliases[args._[0] as Alias]) {
  routexCommand = aliases[args._[0] as Alias]
}

const forwardedArgs = routexCommand ? args._.slice(1) : args._

async function main() {
  // Make sure commands gracefully respect termination signals (e.g. from Docker)
  process.on('SIGTERM', () => process.exit(0))
  process.on('SIGINT', () => process.exit(0))

  if (routexCommand) {
    const commandFn = commands[routexCommand]
    commandFn?.()
      .then((exec: CallableFunction) => exec(forwardedArgs))
      .then(() => {
        process.exit(0)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }
}

main().catch((e) => {
  console.error(e)
})
