"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Evite les capslock
 */
class CapslockFilter {
    filter(message) {
        if (this.isCapslock(message.content)) {
            message.channel
                .send(`:scream_cat: Pas la peine de hurler <@!${message.author.id}>`)
                .catch(console.error);
            return true;
        }
        return false;
    }
    isCapslock(content) {
        return (content === content.toUpperCase() &&
            content.length > 15 &&
            content.match(/[A-Z]{4,}/) !== null);
    }
}
exports.default = CapslockFilter;
//# sourceMappingURL=CapslockFilter.js.map