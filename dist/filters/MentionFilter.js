"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Réagit au message ne contenant qu'une mention "@user"
 */
class MentionFilter {
    constructor() {
        this.regexp = /^\<\@([0-9]+)\>$/i;
    }
    filter(message) {
        if (message.content.startsWith('<@') &&
            message.content.match(this.regexp) !== null) {
            message.channel
                .send(`:robot: Merci de ne pas mentionner un autre utilisateur sans message <@!${message.author.id}>`)
                .catch();
            return true;
        }
        return false;
    }
}
exports.default = MentionFilter;
//# sourceMappingURL=MentionFilter.js.map