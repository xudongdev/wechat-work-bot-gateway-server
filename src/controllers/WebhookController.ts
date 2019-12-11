import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query
} from "@nestjs/common";
import axios from "axios";

import { Gateway } from "../models/Gateway";
import { SandboxService } from "../services/SandboxService";

@Controller("gateways")
export class WebhookController {
  public constructor(private readonly sandboxService: SandboxService) {
    return this;
  }

  @Get(":id/webhook")
  public async get(
    @Param("id") id: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Headers() headers: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Query() query: any
  ): Promise<{ status: string }> {
    return this.post(id, headers, query);
  }

  @Post(":id")
  public async post(
    @Param("id") id: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Headers() headers: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Query() query: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Body() body?: any
  ): Promise<{ status: string }> {
    const webhook = await Gateway.findOne({ where: { id } });

    const data = await this.sandboxService.run(webhook.code, {
      headers,
      query,
      body
    });

    // eslint-disable-next-line no-restricted-syntax
    for (const bot of webhook.bots) {
      // eslint-disable-next-line no-await-in-loop
      await axios.post(bot.webhookUrl, data);
    }

    return { status: "success" };
  }
}
