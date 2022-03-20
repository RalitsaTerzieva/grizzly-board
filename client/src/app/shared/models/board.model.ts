import { Column } from "./column.model";
import { Deserializable } from "./deserializable.model";
import { User } from "./user.model";

export class Board implements Deserializable{
    id!: number;
    name!: string;
    description!: string;
    start_date!: string;
    end_date!: string;
    author!: User;
    columns!: Column[];
    createdAt!: string;
    updatedAt!: string;

    deserialize(input: any) {
        Object.assign(this, input);
        this.author = new User().deserialize(input.author);
        this.columns = input.columns.map((c: any) => new Column().deserialize(c));
        return this;
    }
  }