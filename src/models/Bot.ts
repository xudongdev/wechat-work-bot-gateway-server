import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Gateway } from "./Gateway";

@ObjectType()
@Entity()
export class Bot extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Field()
  @Column()
  public name: string;

  @Field()
  @Column({ type: "text" })
  public webhookUrl: string;

  @Field()
  @CreateDateColumn()
  public createdAt: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt: Date;

  @Field(() => [Gateway], { nullable: true })
  @ManyToMany(
    () => Gateway,
    gateway => gateway.bots,
    {
      onDelete: "CASCADE"
    }
  )
  public gateways?: Gateway[];
}
