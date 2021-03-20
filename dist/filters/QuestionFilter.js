"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Vérifie si le message est une question ouverte
 */
class QuestionFilter {
    filter(message) {
        if (this.isQuestion(message.content.trim())) {
            message.channel
                .send(`:question: N'hésite pas à poser ta question directement <@!${message.author.id}>, il n'est pas utile de demander si quelqu'un connait quelque chose avant.`)
                .catch(console.error);
            return true;
        }
        return false;
    }
    isQuestion(content) {
        return (content.split(' ').length <= 10 &&
            content.match(/^(bonjour |salut )?([^ ]+ ){0,3}(qui s'y conna(î|i)(t|s)|des gens|(pour|pou(r|rr)a(î|i)t(s)?) m(\'|\")aid(e|é)(z|r)?|quelqu'un|qqun|qq|des personnes)[^\?]+\??$/i) !== null);
    }
}
exports.default = QuestionFilter;
//# sourceMappingURL=QuestionFilter.js.map