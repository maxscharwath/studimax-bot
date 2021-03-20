"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guildId = exports.loggerId = exports.syntax = exports.modoRole = exports.roles = void 0;
// Rôles modifiables par l'utilisateur
exports.roles = {
    fullstack: '305381229753139200',
    backend: '305381310996676609',
    frontend: '305381272832704514',
    devops: '305426040077942785',
    designer: '305425719515938836',
    freelance: '305381504479920129',
    etudiant: '305381380802609163'
};
exports.modoRole = '👮‍Modérateur';
exports.syntax = {
    '245543980224217089': /^(\[[^\]]+\]|<\:[a-z0-9]+\:[0-9]+>)( |\n)(.|\n)+( |\n)<?https?:\/\/\S*>?$/im,
    '106702700409815040': /^(\[[^\]]+\]|<\:[a-z0-9]+\:[0-9]+>)( |\n)(.|\n)+( |\n)<?https?:\/\/\S*>?$/im
};
exports.loggerId = '477123703658905606';
exports.guildId = '144903221696135169'; // Id du serveur
//# sourceMappingURL=config.js.map