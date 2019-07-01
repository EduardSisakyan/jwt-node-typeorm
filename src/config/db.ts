import { ConnectionOptions } from 'typeorm';
import { Vehicle } from '../entity/vehicle';
import { User } from '../entity/user';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_LOGGING } from '../utils/secrets';

const config: ConnectionOptions = {
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    logging: DB_LOGGING,
    migrationsRun: true,
    migrations: ['dist/migration/*.js'],
    cli: {
        migrationsDir: 'dist/migrations'
    },
    entities: [
        Vehicle,
        User
    ],
};

export = config;