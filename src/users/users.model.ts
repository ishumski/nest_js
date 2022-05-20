import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user_roles.model";

type UserCreationAttrs = {
    email: string,
    password: string
}

@Table({tableName: 'users'})
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
    banned: boolean

    @ApiProperty({example: "Rude behaviour", description: ""})
    @Column({type: DataType.STRING, allowNull: true})
    bannedReason: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
}