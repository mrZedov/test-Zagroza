import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Files {
  @ApiProperty({ description: 'ID' })
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  firstName: string;

  @Property({ nullable: true })
  secondName: string;

  @Property({ nullable: true })
  country: string;

  @Property({ nullable: true })
  age: number;
}
