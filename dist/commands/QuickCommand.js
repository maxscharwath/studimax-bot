"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QuickCommand {
    constructor(name, description, message) {
        this.name = name;
        this.description = description;
        this.message = message;
    }
    run(message, args) {
        message.delete().catch();
        let user = '';
        let content = args[0];
        if (args.length > 1) {
            user = args[0];
            content = args.slice(1).join(' ');
        }
        message.channel
            .send(this.message.replace('@user', user).replace('@content', content).replace('@url:content', encodeURIComponent(content)))
            .catch();
    }
}
exports.default = QuickCommand;
//# sourceMappingURL=QuickCommand.js.map