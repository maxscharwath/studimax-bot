"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../utils/helpers");
class SyntaxFilter {
    constructor(syntaxes) {
        this.syntaxes = syntaxes;
    }
    filter(message) {
        if (Object.keys(this.syntaxes).includes(message.channel.id) &&
            message.content.match(this.syntaxes[message.channel.id]) === null) {
            helpers_1.sendDMorReplyAutoDelete(message, `:octagonal_sign: Votre message a été supprimé car il ne respecte pas le format imposé par le channel
\`\`\`
${message.cleanContent}
\`\`\``).catch();
            message.delete().catch();
            return true;
        }
        return false;
    }
}
exports.default = SyntaxFilter;
//# sourceMappingURL=SyntaxFilter.js.map