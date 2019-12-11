import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ID } from "type-graphql";

import { CreateBotInput } from "../inputs/CreateBotInput";
import { UpdateBotInput } from "../inputs/UpdateBotInput";
import { Bot } from "../models/Bot";

@Resolver(() => Bot)
export class BotResolver {
  public constructor() {
    return this;
  }

  @Query(() => Bot)
  public async bot(
    @Args({
      name: "id",
      type: () => ID
    })
    id: string
  ): Promise<Bot> {
    return Bot.findOne({ where: { id }, relations: ["gateways"] });
  }

  @Query(() => [Bot])
  public async bots(): Promise<Bot[]> {
    return Bot.find({ relations: ["gateways"] });
  }

  @Mutation(() => Bot)
  public async createBot(@Args("input") input: CreateBotInput): Promise<Bot> {
    const bot = await Bot.create(input).save();
    bot.gateways = [];
    return bot;
  }

  @Mutation(() => Bot)
  public async updateBot(
    @Args({
      name: "id",
      type: () => ID
    })
    id: string,
    @Args("input") input: UpdateBotInput
  ): Promise<Bot> {
    const bot = await Bot.findOne({ where: { id }, relations: ["gateways"] });

    Object.keys(input).forEach(key => {
      bot[key] = input[key];
    });

    return bot.save();
  }

  @Mutation(() => Bot)
  public async removeBot(
    @Args({
      name: "id",
      type: () => ID
    })
    id: string
  ): Promise<Bot> {
    const bot = await Bot.findOne({ where: { id }, relations: ["gateways"] });
    await bot.remove();
    bot.id = id;
    return bot;
  }
}
