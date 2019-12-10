import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ID } from "type-graphql";

import { CreateWebhookInput } from "../inputs/CreateWebhookInput";
import { UpdateWebhookInput } from "../inputs/UpdateWebhookInput";
import { Webhook } from "../models/Webhook";

@Resolver(() => Webhook)
export class WebhookResolver {
  public constructor() {
    return this;
  }

  @Query(() => Webhook)
  public async webhook(
    @Args({
      name: "id",
      type: () => ID
    })
    id: string
  ): Promise<Webhook> {
    return Webhook.findOne({ where: { id } });
  }

  @Query(() => [Webhook])
  public async webhooks(): Promise<Webhook[]> {
    return Webhook.find();
  }

  @Mutation(() => Webhook)
  public async createWebhook(
    @Args("input") input: CreateWebhookInput
  ): Promise<Webhook> {
    return Webhook.create(input).save();
  }

  @Mutation(() => Webhook)
  public async updateWebhook(
    @Args({
      name: "id",
      type: () => ID
    })
    id: string,
    @Args("input") input: UpdateWebhookInput
  ): Promise<Webhook> {
    const webhook = await Webhook.findOne({ where: { id } });

    Object.keys(input).forEach(key => {
      webhook[key] = input[key];
    });

    return webhook.save();
  }

  @Mutation(() => Webhook)
  public async removeWebhook(
    @Args({
      name: "id",
      type: () => ID
    })
    id: string
  ): Promise<Webhook> {
    const webhook = await Webhook.findOne({ where: { id } });
    return webhook.remove();
  }
}
