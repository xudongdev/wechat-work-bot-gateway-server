import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { WebhookController } from "./controllers/WebhookController";
import { Bot } from "./models/Bot";
import { Gateway } from "./models/Gateway";
import { User } from "./models/User";
import { BotResolver } from "./resolvers/BotResolver";
import { GatewayResolver } from "./resolvers/GatewayResolver";
import { PlaygroundResolver } from "./resolvers/PlaygroundResolver";
import { SandboxService } from "./services/SandboxService";

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

@Module({
  imports: [
    GraphQLModule.forRoot({
      tracing: true,
      autoSchemaFile: true,
      introspection: true,
      playground: true
    }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN || "1d" }
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    TypeOrmModule.forFeature([Bot, Gateway, User]),
    TypeOrmModule.forRoot()
  ],
  controllers: [WebhookController],
  providers: [BotResolver, GatewayResolver, PlaygroundResolver, SandboxService]
})
export class AppModule {}
