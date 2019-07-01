import 'reflect-metadata';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import { container } from './config/inversify';
import { createConnection } from 'typeorm';
import { Vehicle } from './entity/vehicle';

const server = new InversifyExpressServer(container, undefined);

server.setConfig(async (app) => {
  await createConnection({
    "type": "mysql",
  "host": "localhost",
  "name": "default",
  "port": 3306,
  "username": "root",
  "password": "",
  "database": "vehicle",
  "logging": false,
  "synchronize": true,
  "migrationsRun": true,
  "entities": [
    Vehicle,
  ],
  "migrations": [
    "dist/migration/**/*.js"
  ],
  "subscribers": [
    "dist/subscriber/**/*.js"
  ],
  "cli": {
     "entitiesDir": "src/entity",
     "migrationsDir": "src/migration",
     "subscribersDir": "src/subscriber"
  }
  });


  app.use(compression());
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
});

server.setErrorConfig((app) => {
  app.use((err: any, req: any, res: any, next: any) => {
    console.error(err);
    res.status(500).send('Something broke!');
  });
});

const app = server.build();
// Starts the app
console.log('Starting apps...');
app.listen(3000);

export { app };