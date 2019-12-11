import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Bot } from "./Bot";

@ObjectType()
@Entity()
export class Gateway extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
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

  @Field(() => [Bot], { nullable: true })
  @JoinTable()
  @ManyToMany(
    () => Bot,
    bot => bot.gateways,
    {
      onDelete: "CASCADE"
    }
  )
  public bots?: Bot[];
}
