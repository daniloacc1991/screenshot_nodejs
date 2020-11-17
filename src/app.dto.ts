import { IsNotEmpty, IsUrl } from "class-validator";

export class AppDTO {
    @IsNotEmpty({message: 'Url not can be empty'})
    @IsUrl({protocols: ['http', 'https']})
    readonly url: string;
}