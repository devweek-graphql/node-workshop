const sqlite3 = require('sqlite3');

class DAO {
    constructor() {
        this.db = new sqlite3.Database('./rockets.db', (err) => {
            if (err) {
                console.log('Could not connect to database', err)
            } else {
                console.log('Connected to database')
            }
        })
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log('Error running sql ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve({ id: this.lastID })
                }
            })
        })
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

const performanceLogger = async (fn, tag) => {
    const t0 = performance.now();
    const something = await fn();
    const t1 = performance.now();
    console.log(`Rocket DB - ${tag} took: ${Math.trunc(t1 - t0)}ms -`);
    return something;
}

class RocketRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS rockets (
                id TEXT PRIMARY KEY,
                rocket TEXT
        )`
        return this.dao.run(sql)
    }

    create(rocket) {
        const rocketStringified = JSON.stringify(rocket);
        return this.dao.run(
            `INSERT INTO rockets (id, rocket) VALUES (?, ?)`, [rocket.id, rocketStringified])
    }

    async getById(id) {
        const result = await performanceLogger(
            () => this.dao.get(`SELECT * FROM rockets WHERE id = ?`,[id])
            ,'getById');
        return JSON.parse(result.rocket);
    }

    async getAll() {
        const results = await performanceLogger(
            () => this.dao.all(`SELECT * FROM rockets`)
            ,'getAll');
        return results.map(dataset => JSON.parse(dataset.rocket));
    }

    async getByIds(ids) {
        const results = await performanceLogger(
            () => this.dao.all(`SELECT * FROM rockets WHERE id IN (${ids.map(id => '?').join(',')})`, ids)
            ,'getByIds');
        return results.map(dataset => JSON.parse(dataset.rocket));
    }
}


module.exports = {
    DAO,
    RocketRepository
};