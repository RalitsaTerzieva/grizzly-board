import { Deserializable } from "./deserializable.model";
import { User } from "./user.model";

export class Card implements Deserializable {
    id?: number;
    title!: string;
    index!: number;
    description!: string;
    comment?: string;
    author?: User;
    
    deserialize(input: any) {
        Object.assign(this, input);
        this.author = new User().deserialize(input.author);
        return this;
    }
}