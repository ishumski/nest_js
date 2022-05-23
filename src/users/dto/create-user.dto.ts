import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDTO {

    @ApiProperty({example: 'user@mail.com', description: "Users' email"})
    @IsString({message: 'Invalid email format'})
    @IsEmail({},{message: 'Incorrect email'})
    readonly email: string;
    @ApiProperty({example: '1323', description: "Users' password"})
    @IsString({message: 'Invalid password format'})
    @Length(4,16, {message: 'More then 4, less then 16'})
    readonly password: string;
}