"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../utils/helpers");
/**
 * Supprime plusieurs messages
 */
class JeSaisToutCommand {
    constructor() {
        this.name = 'brain';
        this.admin = true;
    }
    run(reaction, user) {
        reaction.remove().catch(console.error);
        const author = reaction.message.author;
        const quote = (str) => str
            .split('\n')
            .map(s => `> ${s}`)
            .join('\n');
        const message = `:brain: Inutile de donner plus d'informations que nécessaire <@!${author.id}>.

${quote(reaction.message.content)}

Essaie d'adapter ta réponse au niveau de la discussion, donner trop d'informations peut être déroutant et finalement nuire à la discussion.`;
        helpers_1.sendDMorReply(reaction.message, message);
    }
}
exports.default = JeSaisToutCommand;
//# sourceMappingURL=JeSaisToutCommand.js.map