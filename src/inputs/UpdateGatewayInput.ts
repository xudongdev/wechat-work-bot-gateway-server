import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateGatewayInput {
  @Field()
  public name: string;

  @Field()
  public code: string;
}
