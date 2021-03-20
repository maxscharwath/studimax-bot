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
const config_1 = require("./config");
class Bot {
    constructor(client, apiKey = '') {
        this.commands = []; // Liste les commandes à utiliser
        this.reactionCommands = [];
        this.filters = []; // Liste les filtres à utiliser
        this.apiKey = apiKey;
        this.client = client;
        this.client.on('ready', () => {
            let roles = this.client.guilds.cache.first().roles;
            this.modoRole = roles.cache.find(r => r.name === config_1.modoRole);
            this.modos = this.modoRole.members.map(member => member.id);
        });
        this.client.on('message', this.onMessage.bind(this));
        this.client.on('messageUpdate', (_, newMessage) => this.onMessage(newMessage));
        this.client.on('messageReactionAdd', this.onReactionAdd.bind(this));
    }
    /**
     * Ajoute une commande au bot
     * @param {ICommand} command
     * @returns {Bot}
     */
    addCommand(command) {
        this.commands.push(command);
        return this;
    }
    /**
     * Ajoute un filtre au bot
     * @param {IFilter} filter
     */
    addFilter(filter) {
        this.filters.push(filter);
        return this;
    }
    /**
     * Ajoute une commande au bot
     */
    addReactionCommand(command) {
        this.reactionCommands.push(command);
        return this;
    }
    /**
     * Connecte le bot
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('logged');
            yield this.client.login(this.apiKey);
            console.log('logged');
            this.client.on('error', e => console.error(e.message));
            return;
        });
    }
    /**
     * Un message a été envoyé
     * @param {module:discord.js.Message} message
     */
    onMessage(message) {
        return ((this.client.user && message.author.id === this.client.user.id) ||
            (message.content.startsWith('!') && this.runCommand(message) !== false) ||
            (message.channel.type !== 'dm' && this.runFilters(message) !== false));
    }
    /**
     * Détecte l'ajout de réaction
     */
    onReactionAdd(reaction, user) {
        const command = this.reactionCommands.find(function (c) {
            return (c.name === reaction.emoji.name ||
                (c.support && c.support(reaction.emoji.name)));
        });
        const member = reaction.message.guild.member(user);
        if (command === undefined)
            return false;
        if (command.admin === true && !this.isModo(member)) {
            return false;
        }
        return command.run(reaction, user);
    }
    /**
     * Trouve la commande à lancer pour le message
     * @param {module:discord.js.Message} message
     */
    runCommand(message) {
        const parts = message.content.split(' ');
        const commandName = parts[0].replace('!', '');
        const command = this.commands.find(c => c.name === commandName);
        const member = message.guild.member(message.author);
        if (command === undefined)
            return false;
        if (command.admin === true && !this.isModo(member)) {
            return false;
        }
        return command.run(message, parts.slice(1));
    }
    /**
     * Renvoie le message sur tous les filtres
     * @param {module:discord.js.Message} message
     * @returns {boolean}
     */
    runFilters(message) {
        return this.filters.find(f => f.filter(message)) === undefined;
    }
    isModo(member) {
        return member.roles.cache.find(r => r.name === config_1.modoRole) !== undefined;
    }
}
exports.default = Bot;
//# sourceMappingURL=Bot.js.map