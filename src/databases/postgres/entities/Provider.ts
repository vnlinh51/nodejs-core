import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Type } from 'class-transformer';

import { Author } from '@Entities/Author';
import { Book } from '@Entities/Book';

@Entity({
  name: 'provider',
})

export class Provider {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  description: string;
}
