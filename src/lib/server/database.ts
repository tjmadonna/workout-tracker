import { env } from '$env/dynamic/private';
import pg from 'pg';

const databasePool = new pg.Pool({
	database: env.PGDATABASE,
	host: env.PGHOST,
	user: env.PGUSER,
	password: env.PGPASSWORD,
	ssl: env.PGSSLMODE === 'require'
});

export { databasePool };
