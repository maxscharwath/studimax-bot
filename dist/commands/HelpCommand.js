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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("./Command"));
class HelpCommand extends Command_1.default {
    constructor(commands) {
        super();
        this.name = 'help';
        this.description = 'Affiche cette aide';
        this.commands = [];
        this.commands = commands;
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let commands = this.commands.reduce(function (acc, command) {
                if (command.admin !== true) {
                    acc[command.name] = command.description;
                }
                return acc;
            }, {});
            let commandsName = Object.keys(commands).sort();
            let help = commandsName
                .map(function (name) {
                return `**!${name}**: ${commands[name]}`;
            })
                .join('\n');
            yield this.replyDM(`Voici la liste de mes commandes disponibles :
      ${help}`, message);
        });
    }
}
exports.default = HelpCommand;
//# sourceMappingURL=HelpCommand.js.map