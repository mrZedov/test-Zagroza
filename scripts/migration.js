#!/usr/bin/env node

const { MikroORM } = require('@mikro-orm/core');
const yargs = require('yargs');

const path = require('path');
const projectPath = path.dirname(__dirname);

require('dotenv').config({ path: path.join(projectPath, '.env') });


const args = yargs.scriptName('migration')
  .usage('$0 <cmd> [args]')
  .command('create', 'Create new migration with current schema diff', (yargs) => {
    yargs.positional('blank', { alias: 'b', type: 'boolean', default: false,  })
  })
  .command('up', 'Migrate up to the latest version')
  .command('down', 'Migrate one step down')
  .command('list', 'List all executed migrations')
  .command('pending', 'List all pending migrations')
  .demandCommand(1)
  .option('config', { alias: 'c', type: 'string' })
  .help()
  .parse();

const configFile = args.config || path.join(projectPath, 'dist', 'config', 'mikro-orm.config');

const config = require(configFile).default;
config.migrations.path = path.isAbsolute(config.migrations.path) ? config.migrations.path : path.join(projectPath, config.migrations.path);

MikroORM.init(config)
  .then(async (orm) => {
    const migrator = orm.getMigrator();
    try {
      if (args._.includes('create')) {
        await migrator.createMigration(undefined, args.blank);
      } else if (args._.includes('up')) {
        await migrator.up()
      } else if (args._.includes('down')) {
        await migrator.down()
      } else if (args._.includes('list')) {
        const executed = await migrator.getExecutedMigrations()
        console.log(executed.map(v => `${v.name}\t${v.executed_at}`).join('\n'));
      } else if (args._.includes('pending')) {
        const pending = await migrator.getPendingMigrations();
        console.log(pending.map(v => v.file).join('\n'));
      } else {
        yargs.showHelp();
      }
    } finally {
      await orm.close();
    }
  })
.catch((e) => console.error(e));
