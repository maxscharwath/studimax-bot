"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Supprime plusieurs messages
 */
class SecCommand {
    constructor() {
        this.name = 'sec';
        this.admin = true;
    }
    run(reaction, user) {
        reaction.users.remove(user).catch(console.error);
        const author = reaction.message.author;
        const message = `:anger: Pas besoin d'être aussi sec ! <@!${author.id}> si la question ne t'intérèsse pas abstiens-toi.`;
        reaction.message.channel.send(message).catch(console.error);
    }
}
exports.default = SecCommand;
//# sourceMappingURL=SecCommand.js.map