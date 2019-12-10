import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateWebhookInput {
  @Field()
  public name: string;

  @Field()
  public code: string;
}
