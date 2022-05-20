import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDTO} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BannedDto} from "./dto/banned.dto";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private userRepository: typeof User,
        private roleService: RolesService
        ) {
    }

    async createUser(dto:CreateUserDTO){
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue("ADMIN")
        await user.$set('roles', [role.id])
        user.roles=[role]
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
    }

    async ban(dto:BannedDto){
        const user = await this.userRepository.findByPk(dto.userId)
        if(!user){
            throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
        }
        user.banned = true
        user.bannedReason = dto.bannedReason
        await  user.save()
        return user
    }
}
