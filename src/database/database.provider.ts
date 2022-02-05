import { createConnection } from 'typeorm';
const dbHost: string = process.env.DB_HOST;
const dbPort: number = parseInt(process.env.DB_PORT);
const dbUser: string = process.env.DB_USER;
const dbPass: string = process.env.DB_PASS;
const dbName: string = process.env.DB_NAME;

export const databaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      await createConnection({
        type: 'postgres',
        host: dbHost,
        port: dbPort,
        username: dbUser,
        password: dbPass,
        database: dbName,
        entities: [],
        synchronize: true,
      });
    },
  },
];
