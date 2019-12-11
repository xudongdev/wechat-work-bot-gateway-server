import { Field, InputType } from "type-graphql";

@InputType()
export class CreateGatewayInput {
  @Field()
  public name: string;

  @Field()
  public code: string;
}
