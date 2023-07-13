import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const config = {
  driver: PostgreSqlDriver,
  dbName: process.env.POSTGRES_DB,
  driverOptions: {
    connection: {
      dbName: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_PG_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      charset: 'UTF-8',
    },
  },
  debug: process.env.MIKRO_ORM_DEBUG && +process.env.MIKRO_ORM_DEBUG,
  entities: ['./dist/**/*.entity.js', './node_modules/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts', './node_modules/**/*.entity.ts'],
  discovery: { warnWhenNoEntities: false },
  autoLoadEntities: true,
  migrations: {
    tableName: 'migrations', // name of database table with log of executed transactions
    path: './migrations', // path to the folder with migrations
    glob: '!(*.d).{js,ts}', // regex pattern for the migration files
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    emit: 'js', // migration generation mode
    snapshot: false,
  },
  allowGlobalContext: true,
  validateRequired: false,
};

export default config;
