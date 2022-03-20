import { Card } from "./card.model";
import { Deserializable } from "./deserializable.model";
import { User } from "./user.model";

export class Column implements Deserializable {
    id!: number;
    index!: number;
    name!: string;
    cards!: Card[];
    author!: User;

    deserialize(input: any) {
        Object.assign(this, input);
        this.author = new User().deserialize(input.author);
        this.cards = input.cards.map((c: any) => new Card().deserialize(c));
        return this;
    }
}