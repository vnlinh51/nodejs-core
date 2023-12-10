import { IsArray, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Type } from 'class-transformer';

import { Author } from '@Entities/Author';
import { Provider } from '@Entities/Providers';

@Entity({
  name: 'book',
})

export class Book {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  name: string;

  @ManyToOne(() => Author, (author) => author.id, { onDelete : 'SET NULL' })
  @IsObject()
  @ValidateNested()
  @Type(() => Author)
  author: Author;

  // @OneToMany(() => Provider, (provider) => provider.id, { onDelete : 'SET NULL' })
  // @IsArray()
  // @ValidateNested()
  // @Type(() => Provider)
  // providers: Provider[];
}
