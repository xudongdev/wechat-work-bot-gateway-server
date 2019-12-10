import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";

import { Webhook } from "./Webhook";

@ObjectType()
@Entity()
export class Bot extends BaseEntity {
  @Field()
  @PrimaryColumn("uuid")
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

  @Field(() => [Webhook])
  @ManyToMany(() => Webhook)
  public webhooks: Webhook[];
}
