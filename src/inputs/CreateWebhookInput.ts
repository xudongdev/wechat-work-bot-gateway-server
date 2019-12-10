import { Field, InputType } from "type-graphql";

@InputType()
export class CreateWebhookInput {
  @Field()
  public name: string;

  @Field()
  public code: string;
}
