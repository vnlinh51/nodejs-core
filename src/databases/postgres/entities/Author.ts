import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Type } from 'class-transformer';

import { Book } from './Book';

@Entity({
  name: 'author',
})

export class Author {
  @PrimaryColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  name: string;

  @OneToMany(() => Book, (b) => b.id, { onDelete: 'SET NULL', nullable: true })
  @IsArray()
  @ValidateNested()
  @Type(() => Book)
  books: Book[];
}
