import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { WebhookController } from "./controllers/WebhookController";
import { BotResolver } from "./resolvers/BotResolver";
import { PlaygroundResolver } from "./resolvers/PlaygroundResolver";
import { WebhookResolver } from "./resolvers/WebhookResolver";
import { SandboxService } from "./services/SandboxService";

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

@Module({
  imports: [
    GraphQLModule.forRoot({
      tracing: true,
      autoSchemaFile: true,
      playground: true
    }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN || "1d" }
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    TypeOrmModule.forFeature([]),
    TypeOrmModule.forRoot()
  ],
  controllers: [WebhookController],
  providers: [BotResolver, PlaygroundResolver, WebhookResolver, SandboxService]
})
export class AppModule {}
