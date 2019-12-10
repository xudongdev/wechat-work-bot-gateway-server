import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";

import { Bot } from "./Bot";

@ObjectType()
@Entity()
export class Webhook extends BaseEntity {
  @Field()
  @PrimaryColumn("uuid")
  public id: string;

  @Field()
  @Column()
  public name: string;

  @Field()
  @Column({ type: "text" })
  public code: string;

  @Field()
  @CreateDateColumn()
  public createdAt: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt: Date;

  @Field(() => [Bot])
  @JoinTable()
  @ManyToMany(() => Bot)
  public bots: Bot[];
}
