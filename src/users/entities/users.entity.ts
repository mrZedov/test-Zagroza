import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Users {
  @ApiProperty({ description: 'ID' })
  @PrimaryKey()
  id!: number;

  @Property()
  login: string;

  @Property()
  password: string;

  @Property({nullable: true})
  email: string;

  @Property({ default: false })
  deleted: boolean;
}
