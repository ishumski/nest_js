import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDTO {

    @ApiProperty({example: 'user@mail.com', description: "Users' email"})
    readonly email: string;
    @ApiProperty({example: '1323', description: "Users' password"})
    readonly password: string;
}