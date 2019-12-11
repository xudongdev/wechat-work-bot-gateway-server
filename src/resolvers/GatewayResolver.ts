import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ID } from "type-graphql";

import { CreateGatewayInput } from "../inputs/CreateGatewayInput";
import { UpdateGatewayInput } from "../inputs/UpdateGatewayInput";
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
    return Gateway.findOne({ where: { id } });
  }

  @Query(() => [Gateway])
  public async gateways(): Promise<Gateway[]> {
    return Gateway.find();
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
    const gateway = await Gateway.findOne({ where: { id } });

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
    const gateway = await Gateway.findOne({ where: { id } });
    return gateway.remove();
  }
}
