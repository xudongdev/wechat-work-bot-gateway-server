import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-type-json";

import { SandboxService } from "../services/SandboxService";

@Resolver()
export class PlaygroundResolver {
  public constructor(private readonly sandboxService: SandboxService) {
    return this;
  }

  @Mutation(() => GraphQLJSONObject)
  public async runCode(
    @Args("code")
    code: string,
    @Args({ name: "context", nullable: true, type: () => GraphQLJSONObject })
    context: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    return this.sandboxService.run(code, context);
  }
}
