import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Type } from 'class-transformer';

import { Author } from './Author';
import { Book } from './Book';

@Entity({
  name: 'provider',
})

export class Provider {
  @PrimaryColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  name: string;

  @OneToMany(() => Author, (a) => a.id, { onDelete: 'SET NULL' })
  @IsArray()
  @ValidateNested()
  @Type(() => Author)
  authors: Author[];

  @OneToMany(() => Book, (b) => b.id, { onDelete: 'SET NULL' })
  @IsArray()
  @ValidateNested()
  @Type(() => Book)
  books: Book[];
}
