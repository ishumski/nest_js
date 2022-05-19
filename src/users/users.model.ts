import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

type UserCreationAttrs = {
    email: string,
    password: string
}

@Table
export class User extends Model<User, UserCreationAttrs>{

    @ApiProperty({example: 1, description: "Unique number"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey:true})
    id: number

    @ApiProperty({example: "user@mail.com", description: "Users' email"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({example: "1323", description: "Users' password"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @ApiProperty({example: true, description: "Banned"})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: string

    @ApiProperty({example: "Rude behaviour", description: ""})
    @Column({type: DataType.STRING, allowNull: true})
    bannedReason: string
}