import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UserRoles} from "./user_roles.model";
import {User} from "../users/users.model";

type RoleCreationAttrs = {
    value: string,
    description: string
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs>{

    @ApiProperty({example: 1, description: "Unique number"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey:true})
    id: number

    @ApiProperty({example: "ADMIN", description: "Users' role"})
    @Column({type: DataType.STRING,unique: true, allowNull: false})
    value: string

    @ApiProperty({example: "1323", description: "Roles' description"})
    @Column({type: DataType.STRING, allowNull: false})
    description: string

    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}