"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BanCommand {
    constructor(logger) {
        this.name = 'ban';
        this.description = 'Permet de bannir un utilisateur';
        this.admin = true;
        this.logger = logger;
    }
    run(message, args) {
        let reason = args.slice(1).join(' ');
        let member = message.mentions.members.first();
        this.logger.log(`<@!${message.author.id}> a banni <@!${member.id}>\n **Raison :** ${reason}`);
        message.mentions.members
            .first()
            .ban({
            days: 7,
            reason: reason
        })
            .catch();
        message.delete().catch();
    }
}
exports.default = BanCommand;
//# sourceMappingURL=BanCommand.js.map