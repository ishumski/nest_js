import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import {CreateUserDTO} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guards";
import {AddRoleDto} from "./dto/add-role.dto";
import {BannedDto} from "./dto/banned.dto";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('user-controller')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService ) {}


    @ApiOperation({summary: 'create user'})
    @ApiResponse({status: 200, type:User})
    @UsePipes(ValidationPipe)
    @Post()
    create( @Body() userDto: CreateUserDTO ){
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({summary: 'get users'})
    @ApiResponse({status: 200, type:User})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers()
    }

    @ApiOperation({summary: 'add role'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'add ban'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BannedDto) {
        return this.usersService.ban(dto);
    }
}
