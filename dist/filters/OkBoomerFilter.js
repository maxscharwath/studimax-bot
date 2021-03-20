"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Evite la guerre Chocolatine / Pain au chocolat
 */
class OkBoomerFilter {
    filter(message) {
        if (message.content.toLowerCase().match(/boomer/i) !== null) {
            message.channel
                .send(`OK Boomer !`)
                .catch(console.error);
            return true;
        }
        return false;
    }
}
exports.default = OkBoomerFilter;
//# sourceMappingURL=OkBoomerFilter.js.map