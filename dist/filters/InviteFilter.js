"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Evite la guerre Chocolatine / Pain au chocolat
 */
class InviteFilter {
    constructor(muteCommand) {
        this.muteCommand = muteCommand;
    }
    filter(message) {
        if (message.content.match(/(discord\.(gg|io|me|li)|discordapp\.com\/(invite|oauth2))\/[0-9A-Za-z]+/i) !== null) {
            this.muteCommand
                .muteMember(message.member, "Les liens d'invitation discord sont interdit sur ce serveur")
                .then(function () {
                return message.delete();
            })
                .catch(console.error);
            return true;
        }
        return false;
    }
}
exports.default = InviteFilter;
//# sourceMappingURL=InviteFilter.js.map