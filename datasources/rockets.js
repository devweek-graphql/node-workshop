const { DataBase } = require('./database');

class RocketRepository {
    constructor() {
        this.rocketsDB = new DataBase('./rockets.db');
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS rockets (
                id TEXT PRIMARY KEY,
                rocket TEXT
        )`
        return this.rocketsDB.run(sql)
    }

    create(rocket) {
        const rocketStringified = JSON.stringify(rocket);
        return this.rocketsDB.run(
            `INSERT INTO rockets (id, rocket) VALUES (?, ?)`, [rocket.id, rocketStringified])
    }

    async getById(id) {
        const result = await this.rocketsDB.get(`SELECT * FROM rockets WHERE id = ?`,[id]);
        return JSON.parse(result.rocket);
    }

    async getAll() {
        const results = await this.rocketsDB.all(`SELECT * FROM rockets`);
        return results.map(dataset => JSON.parse(dataset.rocket));
    }

    async getByIds(ids) {
        const results = await this.rocketsDB.all(`SELECT * FROM rockets WHERE id IN (${ids.map(id => '?').join(',')})`, ids);
        return results.map(dataset => JSON.parse(dataset.rocket));
    }
}


module.exports = {
    RocketRepository
};