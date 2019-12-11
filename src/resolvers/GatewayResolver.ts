import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import _ from "lodash";
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
    return Gateway.create(input).save();
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
    return gateway.remove();
  }

  @Mutation(() => Gateway)
  public async addGatewayBots(
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

    const bots = await Bot.find({ where: { id: In(botIds) } });

    gateway.bots = _.uniqBy([...gateway.bots, ...bots], "id");

    return gateway.save();
  }

  @Mutation(() => Gateway)
  public async removeGatewayBots(
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

    gateway.bots = gateway.bots.filter(o => botIds.indexOf(o.id) < 0);

    return gateway.save();
  }
}
