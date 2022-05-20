import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDTO} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ){}

   async login(userDto: CreateUserDTO ){
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

   async registration(userDto: CreateUserDTO){
        const candidate = await this.userService.getUserByEmail(userDto.email)
       if(candidate){
           throw new HttpException('User has already registered', HttpStatus.BAD_REQUEST)
       }
       const hashedPass = await bcrypt.hash(userDto.password, 5)
       const user = await this.userService.createUser({...userDto, password: hashedPass})
       return this.generateToken(user)
    }

   private async generateToken(user:User){
        const payload = {email: user.email, id:user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDTO) {
        const user = await this.userService.getUserByEmail(userDto.email)
        const isPassEquals = await bcrypt.compare(userDto.password, user.password)

        if(user && isPassEquals){
            return user
        }
        throw new UnauthorizedException({ message: 'Invalid user email or password'})
    }
}
