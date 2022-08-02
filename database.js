import pg from "pg";

export const pool = new pg.Pool({
    host: 'localhost',
    database: 'taskorganizer'
});

// console.log((await pool.query('SELECT * FROM tasks')).rows);