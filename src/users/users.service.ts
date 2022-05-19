import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDTO} from "./dto/create-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {
    }

    async createUser(dto:CreateUserDTO){
        const user = await this.userRepository.create(dto)
        return user
    }

    async getAllUsers(){
        const users = await this.userRepository.findAll()
        return users
    }

}
