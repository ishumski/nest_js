import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

type PostCreationAttrs = {
    title: string
    content: string
    image: string
    userId: number
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey:true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    title: string

    @Column({type: DataType.STRING, allowNull: false})
    content: string

    @Column({type: DataType.STRING})
    image: string

    @ForeignKey(()=> User)
    @Column( {type: DataType.INTEGER})
    userId: number

    @BelongsTo(()=> User)
    author: User

}