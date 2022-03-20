import { Deserializable } from "./deserializable.model";

export class User implements Deserializable {
  id!: number;
  email!: string;
  first_name!: string;
  last_name!: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}