'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230713075624 extends Migration {

  async up() {
    this.addSql('create table "files" ("id" serial primary key, "first_name" varchar(255) null, "second_name" varchar(255) null, "country" varchar(255) null, "age" int null);');

    this.addSql('create table "users" ("id" serial primary key, "login" varchar(255) not null, "password" varchar(255) not null, "email" varchar(255) null, "deleted" boolean not null default false);');
  }

  async down() {
    this.addSql('drop table if exists "files" cascade;');

    this.addSql('drop table if exists "users" cascade;');
  }

}
exports.Migration20230713075624 = Migration20230713075624;
