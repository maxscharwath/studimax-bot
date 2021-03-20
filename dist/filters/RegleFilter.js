"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Réagit au message contenant "règle X"
 */
class MentionFilter {
    constructor() {
        this.regexp = /^règle [0-9].*/i;
    }
    filter(message) {
        if (message.content.match(this.regexp) !== null) {
            message.channel
                .send(`:robot: Pas besoin de faire la police  <@!${message.author.id}>, si tu juge un message inadapté, utilise la réaction :report: pour signaler le message`)
                .catch();
            return true;
        }
        return false;
    }
}
exports.default = MentionFilter;
//# sourceMappingURL=RegleFilter.js.map