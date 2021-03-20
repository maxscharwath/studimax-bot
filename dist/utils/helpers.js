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
exports.durationToString = exports.arrayDiff = exports.sendDMorReplyAutoDelete = exports.sendDMorReply = void 0;
/**
 * Envoie un message en privée ou sur le channel si les MP sont désactivés
 * @param {module:discord.js.Message} message
 * @param {string} content
 * @returns {Promise<any>}
 */
const sendDMorReply = function (message, content) {
    return __awaiter(this, void 0, void 0, function* () {
        return message.author
            .createDM()
            .then(channel => channel.send(content))
            .catch(() => message.reply(content.split('\n')[0]));
    });
};
exports.sendDMorReply = sendDMorReply;
/**
 * Envoie un message en privée ou sur le channel si les MP sont désactivés et supprime le message après coup
 * @param {module:discord.js.Message} message
 * @param {string} content
 * @returns {Promise<any>}
 */
const sendDMorReplyAutoDelete = function (message, content) {
    return __awaiter(this, void 0, void 0, function* () {
        return message.author
            .createDM()
            .then(channel => channel.send(content))
            .catch(function () {
            return __awaiter(this, void 0, void 0, function* () {
                let reply = (yield message.reply(content.split('\n')[0]));
                setTimeout(function () {
                    reply.delete().catch();
                }, 3500);
                return;
            });
        });
    });
};
exports.sendDMorReplyAutoDelete = sendDMorReplyAutoDelete;
/**
 * Renvoie les éléments de arr1 qui ne sont pas dans arr2
 * @param {T[]} arr1
 * @param {T[]} arr2
 * @returns {T[]}
 */
const arrayDiff = function (arr1, arr2) {
    return arr1.filter(i => arr2.indexOf(i) < 0);
};
exports.arrayDiff = arrayDiff;
/**
 * Convertit une durée en ms en chaine
 * @param {number} duration (en ms)
 * @returns {string}
 */
const durationToString = function (duration) {
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    let type = 'seconde';
    let n = duration / 1000;
    if (duration >= day) {
        type = 'jour';
        n = Math.floor(duration / day);
    }
    else if (duration >= hour) {
        type = 'heure';
        n = Math.floor(duration / hour);
    }
    else if (duration >= minute) {
        type = 'minute';
        n = Math.floor(duration / minute);
    }
    if (n > 1)
        type += 's';
    return `${n} ${type}`;
};
exports.durationToString = durationToString;
//# sourceMappingURL=helpers.js.map