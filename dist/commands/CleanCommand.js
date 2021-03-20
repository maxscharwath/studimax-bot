"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("./Command"));
/**
 * Supprime plusieurs messages
 */
class CleanCommand extends Command_1.default {
    constructor(logger) {
        super();
        this.name = 'clean';
        this.description = 'Permet de supprimer X messages, ex: "!clean !messages"';
        this.admin = true;
        this.logger = logger;
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = args[0] ? parseInt(args[0], 10) + 1 : 2;
            const reason = args[1] ? args.slice(1).join(' ') : null;
            let messages = yield message.channel.messages.fetch({
                limit: limit
            });
            if (reason) {
                const embed = new discord_js_1.MessageEmbed()
                    .setImage("https://media.giphy.com/media/6NtM0tLYeLwT6/giphy.gif")
                    .setColor("#c62828")
                    .addField('Message supprimés', messages.array().length, true)
                    .addField('Raison', reason, true);
                message.channel.send(embed).catch(console.error);
            }
            else if (limit <= 5) {
                this.log(message.author, messages).catch(console.error);
            }
            return message.channel.bulkDelete(messages).catch(console.error);
        });
    }
    log(member, messages) {
        return __awaiter(this, void 0, void 0, function* () {
            let deletions = messages
                .map(message => {
                return message.author.username + ': ' + message.cleanContent;
            })
                .slice(1)
                .reverse()
                .join('\n');
            return this.logger
                .log(`:x: <@!${member.id}> a supprimé les messages suivant :
\`\`\`
${deletions}
\`\`\``);
        });
    }
}
exports.default = CleanCommand;
//# sourceMappingURL=CleanCommand.js.map