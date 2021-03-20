"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../utils/helpers");
/**
 * Supprime un message en cas d'insulte
 */
class InsultFilter {
    constructor() {
        this.badwords = 'pute|connard|enculé|bite|ntm|pd|fdp|tepu|salope|conasse|iench|pétasse|catin|bouffone|bouffon|truie';
    }
    filter(message) {
        let regex = new RegExp(`(\\b)(${this.badwords})(\\b)`, 'i');
        if (message.content.match(regex) !== null) {
            helpers_1.sendDMorReply(message, `Hey ! pas d'insulte sur le chan, votre message a été supprimé :disappointed_relieved:
\`\`\`
${message.cleanContent}
\`\`\``).catch();
            message.delete().catch();
            return true;
        }
        return false;
    }
}
exports.default = InsultFilter;
//# sourceMappingURL=InsultFilter.js.map