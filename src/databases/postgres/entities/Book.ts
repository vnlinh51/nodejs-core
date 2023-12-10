import { IsArray, IsDate, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, ManyToMany, OneToMany, CreateDateColumn } from 'typeorm';
import { Type } from 'class-transformer';

import { Author } from '@Entities/Author';
import { Provider } from '@Entities/Provider';

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

  @ManyToOne(() => Provider, (provider) => provider.id, { onDelete : 'SET NULL', nullable: true })
  @IsObject()
  @ValidateNested()
  @Type(() => Provider)
  provider: Provider;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;
}

