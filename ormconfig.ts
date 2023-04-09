import * as path from 'path';

export default {
  type: 'postgres',
  host: process.env.DB_LOCAL_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
  synchronize: true,
  logging: false,
  // These two lines have been added:
  seeds: ['src/db/seeds/**/*{.ts,.js}'],
  factories: ['src/db/factories/**/*{.ts,.js}'],
};
