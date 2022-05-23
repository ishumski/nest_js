import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {UserRoles} from "../roles/user_roles.model";
import {Post} from "../posts/posts.models";


@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRoles, Post ]),
      RolesModule,
      forwardRef(()=> AuthModule)
  ],
    exports: [UsersService]
})
export class UsersModule {}
