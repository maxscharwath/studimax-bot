"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Evite la guerre Chocolatine / Pain au chocolat
 */
class ChocopainFilter {
    filter(message) {
        if (message.content.match(/pain au chocolat|chocolatine/i) !== null) {
            message.channel
                .send(`:croissant: Afin d'éviter tout débat merci d'utiliser le mot consacré **chocopain** pour désigner cette patisserie`)
                .catch(console.error);
            return true;
        }
        return false;
    }
}
exports.default = ChocopainFilter;
//# sourceMappingURL=ChocopainFilter.js.map