"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../utils/helpers");
class CodeFilter {
    filter(message) {
        if (message.content.split('\n').length > 40 &&
            message.content.match(/([\{\}\[\]$;])/gm).length > 3) {
            helpers_1.sendDMorReply(message, `:space_invader: Woops trop de code ! Merci d'utiliser ce service de partage de code : https://paste.mozilla.org/ si tu veux plus d'aide.

Pour rappel voila le message que tu as essayé d'envoyer :

\`\`\`
${message.cleanContent}
\`\`\``)
                .catch()
                .then(() => message.delete())
                .catch();
            return true;
        }
        return false;
    }
}
exports.default = CodeFilter;
//# sourceMappingURL=CodeFilter.js.map