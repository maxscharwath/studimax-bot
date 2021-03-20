"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
/**
 * Supprime plusieurs messages
 */
class ReportCommand {
    constructor(logger) {
        this.name = 'report';
        this.logger = logger;
    }
    run(reaction, user) {
        reaction.remove().catch(console.error);
        const modos = reaction.message.guild.roles.cache.find(r => r.name === config_1.modoRole);
        const permalink = `https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`;
        this.logger.log(`${modos.toString()} <@!${user.id}> a signalé le message ${permalink}
\`\`\`
${reaction.message.content}
\`\`\``);
    }
}
exports.default = ReportCommand;
//# sourceMappingURL=ReportCommand.js.map