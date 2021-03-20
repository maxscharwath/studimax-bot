"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    replyDM(reply, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let channel = yield message.author.createDM();
                yield channel.send(reply);
            }
            catch (e) {
                yield message.reply(reply);
            }
            if (message.channel.type !== 'dm') {
                yield message.delete();
            }
            return;
        });
    }
}
exports.default = Command;
//# sourceMappingURL=Command.js.map