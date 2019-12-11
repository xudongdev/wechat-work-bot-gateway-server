import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ID } from "type-graphql";
import { In } from "typeorm";

import { CreateGatewayInput } from "../inputs/CreateGatewayInput";
import { UpdateGatewayInput } from "../inputs/UpdateGatewayInput";
import { Bot } from "../models/Bot";
import { Gateway } from "../models/Gateway";

@Resolver(() => Gateway)
export class GatewayResolver {
  public constructor() {
    return this;
  }

  @Query(() => Gateway)
  public async gateway(
    @Args({
      name: "id",
      type: () => ID
    })
    id: string
  ): Promise<Gateway> {
    return Gateway.findOne({ where: { id }, relations: ["bots"] });
  }

  @Query(() => [Gateway])
  public async gateways(): Promise<Gateway[]> {
    console.log(await Gateway.find({ relations: ["bots"] }));
    return Gateway.find({ relations: ["bots"] });
  }

  @Mutation(() => Gateway)
  public async createGateway(
    @Args("input") input: CreateGatewayInput
  ): Promise<Gateway> {
    const gateway = await Gateway.create(input).save();
    gateway.bots = [];
    return gateway;
  }

  @Mutation(() => Gateway)
  public async updateGateway(
    @Args({
      name: "id",
      type: () => ID
    })
    id: string,
    @Args("input") input: UpdateGatewayInput
  ): Promise<Gateway> {
    const gateway = await Gateway.findOne({
      where: { id },
      relations: ["bots"]
    });

    Object.keys(input).forEach(key => {
      gateway[key] = input[key];
    });

    return gateway.save();
  }

  @Mutation(() => Gateway)
  public async removeGateway(
    @Args({
      name: "id",
      type: () => ID
    })
    id: string
  ): Promise<Gateway> {
    const gateway = await Gateway.findOne({
      where: { id },
      relations: ["bots"]
    });
    await gateway.remove();
    gateway.id = id;
    return gateway;
  }

  @Mutation(() => Gateway)
  public async setGatewayBots(
    @Args({
      name: "id",
      type: () => ID
    })
    id: string,
    @Args({
      name: "botIds",
      type: () => [ID]
    })
    botIds: string[]
  ): Promise<Gateway> {
    const gateway = await Gateway.findOne({
      where: { id },
      relations: ["bots"]
    });

    gateway.bots =
      botIds.length > 0 ? await Bot.find({ where: { id: In(botIds) } }) : [];
    return gateway.save();
  }
}
