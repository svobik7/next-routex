#!/usr/bin/env node

import type { Config } from '../types'

import path from 'path'
import { createStructure } from './utils/createStructure'

// load CLI args
const [a, b, configPath = 'roots.config.js', configParams = {}] = process.argv

// load runtime config
const cfgRuntime = require(path.join(process.cwd(), configPath)) || configParams

// create final config
const cfgDefault: Config = {
  locales: [],
  defaultLocale: '',
  appName: 'app',
  routes: [],
}

const config: Config = { ...cfgDefault, ...cfgRuntime }
const rootDir = path.dirname(path.join(process.cwd(), configPath))

console.log(a, b)
// createStructure(rootDir, config)
