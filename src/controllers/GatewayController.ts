import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Query
} from "@nestjs/common";
import axios from "axios";

import { Gateway } from "../models/Gateway";
import { SandboxService } from "../services/SandboxService";

@Controller("gateways")
export class GatewayController {
  public constructor(private readonly sandboxService: SandboxService) {
    return this;
  }

  @HttpCode(200)
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

  @HttpCode(200)
  @Post(":id/webhook")
  public async post(
    @Param("id") id: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Headers() headers: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Query() query: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Body() body?: any
  ): Promise<{ status: string }> {
    const gateway = await Gateway.findOne({
      where: { id },
      relations: ["bots"]
    });

    const { result, logs } = await this.sandboxService.run(gateway.code, {
      headers,
      query,
      body
    });

    console.log(`[${gateway.id}]`, result, logs);

    // eslint-disable-next-line no-restricted-syntax
    for (const bot of gateway.bots) {
      // eslint-disable-next-line no-await-in-loop
      await axios.post(bot.webhookUrl, result);
    }

    return { status: "success" };
  }
}
