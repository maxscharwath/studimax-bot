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
const cron_1 = require("cron");
const helpers_1 = require("../utils/helpers");
const minute = 60 * 1000;
const hour = 60 * minute;
const day = 24 * hour;
class MuteCommand {
    constructor(db, client, logger) {
        this.name = 'mute';
        this.description = 'Permet de mute un utilisateur';
        this.admin = true;
        this.jobs = {};
        this.levels = [
            {
                duration: 10 * minute,
                forget: day
            },
            {
                duration: hour,
                forget: 3 * day
            },
            {
                duration: day,
                forget: 5 * day
            },
            {
                duration: 3 * day,
                forget: 7 * day
            },
            {
                duration: 7 * day,
                forget: 10 * day
            }
        ];
        this.db = db;
        this.logger = logger;
        this.client = client;
        this.client.on('ready', this.resetJobs.bind(this));
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let member = message.mentions.members.first();
            let reason = args.slice(1).join(' ');
            this.logger.log(`<@!${message.author.id}> a mute <@!${member.id}>\n **Raison :** ${reason}`);
            this.muteMember(member, reason).catch();
            return true;
        });
    }
    /**
     * Mute un utilisateur
     * @param {module:discord.js.GuildMember} member
     * @param {string} reason
     * @returns {Promise<void>}
     */
    muteMember(member, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            let role = this.getMutedRole();
            let lvl = yield this.incrementLevelForUser(member);
            let duration = helpers_1.durationToString(this.levels[lvl].duration);
            yield member.roles.add(role);
            this.getMutedChannel()
                .send(`<@!${member.id}> Vous avez été muté pour la raison suivante \n\n > *${reason.trim()}* \n\n Le mute sera levé dans **${duration}**, merci de respecter les règles de ce serveur.`)
                .catch();
            this.addJobsFor(member, lvl);
        });
    }
    /**
     * Regénère les "jobs" à partir de la base de données
     */
    resetJobs() {
        this.db.each('SELECT id, lvl, muted_at FROM mutes', (err, row) => {
            if (err === null) {
                let member = this.client.guilds
                    .cache
                    .first()
                    .members.cache.find(m => m.id === row.id);
                if (member) {
                    this.addJobsFor(member, row.lvl);
                }
            }
        });
    }
    /**
     * Crée les 2 "jobs" pour décrémenter le niveau d'agression et supprimer le rôle
     * @param {module:discord.js.GuildMember} member
     * @param {number} lvl
     */
    addJobsFor(member, lvl) {
        let date = Date.now();
        let level = this.levels[lvl];
        let role = this.getMutedRole();
        let jobs = [];
        if (member.roles.cache.has(role.id)) {
            jobs.push(new cron_1.CronJob({
                cronTime: new Date(date + level.duration),
                start: true,
                onTick: function () {
                    member.roles.remove(role).catch();
                }
            }));
        }
        jobs.push(new cron_1.CronJob({
            cronTime: new Date(date + level.forget),
            start: true,
            onTick: () => {
                this.decrementLevelForUser(member).catch();
            }
        }));
        if (this.jobs[member.id]) {
            this.jobs[member.id].forEach(job => job.stop());
        }
        this.jobs[member.id] = jobs;
    }
    /**
     * Récupère le role "muted"
     * @returns {module:discord.js.Role}
     */
    getMutedRole() {
        return this.client.guilds.cache.first().roles.cache.find(r => r.name === 'Muted');
    }
    /**
     * Récupère le role "muted"
     * @returns {module:discord.js.Role}
     */
    getMutedChannel() {
        return this.client.guilds
            .cache
            .first()
            .channels
            .cache
            .find(c => c.name === 'muted');
    }
    decrementLevelForUser(member) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db.get('SELECT lvl FROM mutes WHERE id = ?', [member.id], (err, row) => {
                    if (err !== null)
                        return reject(err);
                    if (row.lvl === 0) {
                        this.db.run('DELETE FROM mutes WHERE id = ?', [member.id]);
                    }
                    else {
                        this.db.run('UPDATE mutes SET lvl = lvl - 1, muted_at = ? WHERE id = ?', [member.id, Date.now()]);
                        this.addJobsFor(member, row.lvl - 1);
                    }
                    resolve(row.lvl - 1);
                });
            });
        });
    }
    /**
     * Récupère le niveau "d'agression" d'un utilisateur
     * @returns {Promise<any>}
     * @param member
     */
    incrementLevelForUser(member) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let db = this.db;
                db.run('UPDATE mutes SET muted_at = ?, lvl = lvl + 1 WHERE id = ?', [Date.now(), member.id], function (err, row) {
                    if (err !== null)
                        return reject(err);
                    if (this.changes > 0) {
                        db.get('SELECT lvl FROM mutes WHERE id = ?', [member.id], function (err, row) {
                            if (err === null)
                                return resolve(row.lvl);
                            return reject(err);
                        });
                    }
                    else {
                        db.run('INSERT INTO mutes (id, muted_at) VALUES (?, ?)', [
                            member.id,
                            Date.now()
                        ]);
                        resolve(0);
                    }
                });
            });
        });
    }
}
exports.default = MuteCommand;
//# sourceMappingURL=MuteCommand.js.map