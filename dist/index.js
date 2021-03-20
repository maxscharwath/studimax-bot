"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const Bot_1 = __importDefault(require("./Bot"));
const commands_1 = require("./commands");
const discord_js_1 = require("discord.js");
const Logger_1 = __importDefault(require("./utils/Logger"));
const filters_1 = require("./filters");
const sqlite3_1 = __importDefault(require("sqlite3"));
const reactions_1 = require("./reactions");
const OkBoomerFilter_1 = __importDefault(require("./filters/OkBoomerFilter"));
dotenv.config();
const db = new sqlite3_1.default.Database('db.sqlite');
const client = new discord_js_1.Client();
const logger = new Logger_1.default(client);
const bot = new Bot_1.default(client, process.env.API_KEY);
const muteCommand = new commands_1.MuteCommand(db, client, logger);
bot
    .addCommand(new commands_1.BanCommand(logger))
    .addCommand(muteCommand)
    .addCommand(new commands_1.CleanCommand(logger))
    .addCommand(new commands_1.HelpCommand(bot.commands))
    .addReactionCommand(new reactions_1.ReportCommand(logger))
    .addReactionCommand(new reactions_1.SecCommand())
    .addReactionCommand(new reactions_1.JeSaisToutCommand())
    .addReactionCommand(new reactions_1.RuleCommand(logger))
    .addFilter(new filters_1.CapslockFilter())
    .addFilter(new filters_1.ChocopainFilter())
    .addFilter(new OkBoomerFilter_1.default())
    .addFilter(new filters_1.InviteFilter(muteCommand))
    .connect()
    .catch(function (e) {
    console.error(e);
});
//# sourceMappingURL=index.js.map