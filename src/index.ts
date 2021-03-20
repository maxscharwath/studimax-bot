import * as dotenv from 'dotenv'
import Bot from './Bot'
import {
  MuteCommand,
  HelpCommand,
  CleanCommand,
  BanCommand
} from './commands'
import { Client } from 'discord.js'
import { syntax } from './config'
import Logger from './utils/Logger'
import {
  CapslockFilter,
  ChocopainFilter,
  ErrorsFilter,
  RegleFilter,
  CodeFilter,
  SyntaxFilter,
  InviteFilter
} from './filters'
import sqlite3 from 'sqlite3'
import {
  JeSaisToutCommand,
  ReportCommand,
  SecCommand,
  RuleCommand
} from './reactions'
import OkBoomerFilter from "./filters/OkBoomerFilter";

dotenv.config()

const db = new sqlite3.Database('db.sqlite')
const client = new Client()
const logger = new Logger(client)
const bot = new Bot(client, process.env.API_KEY)
const muteCommand = new MuteCommand(db, client, logger)
bot
  .addCommand(new BanCommand(logger))
  .addCommand(muteCommand)
  .addCommand(new CleanCommand(logger))
  .addCommand(new HelpCommand(bot.commands))
  .addReactionCommand(new ReportCommand(logger))
  .addReactionCommand(new SecCommand())
  .addReactionCommand(new JeSaisToutCommand())
  .addReactionCommand(new RuleCommand(logger))
  .addFilter(new CapslockFilter())
  .addFilter(new ChocopainFilter())
  .addFilter(new OkBoomerFilter())
  .addFilter(new InviteFilter(muteCommand))
  .connect()
  .catch(function (e: string) {
    console.error(e)
  })
