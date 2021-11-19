const performanceLogger = async (fn, tag) => {
    const t0 = performance.now();
    const something = await fn();
    const t1 = performance.now();
    console.log(`DB - ${tag} took: ${Math.trunc(t1 - t0)}ms -`);
    return something;
}

class RocketRepository {
    constructor(rocketsDB) {
        this.rocketsDB = rocketsDB
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
        const result = await performanceLogger(
            () => this.rocketsDB.get(`SELECT * FROM rockets WHERE id = ?`,[id])
            ,'getById');
        return JSON.parse(result.rocket);
    }

    async getAll() {
        const results = await performanceLogger(
            () => this.rocketsDB.all(`SELECT * FROM rockets`)
            ,'getAll');
        return results.map(dataset => JSON.parse(dataset.rocket));
    }

    async getByIds(ids) {
        const results = await performanceLogger(
            () => this.rocketsDB.all(`SELECT * FROM rockets WHERE id IN (${ids.map(id => '?').join(',')})`, ids)
            ,'getByIds');
        return results.map(dataset => JSON.parse(dataset.rocket));
    }
}


module.exports = {
    RocketRepository
};