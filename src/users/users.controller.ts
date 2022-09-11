import {
    Post,
    Body,
    Get,
    Patch,
    Param,
    Query,
    Delete,
    NotFoundException
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { UserDto } from './dtos/user.dto';

import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService) {

    }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto): void {
        this.usersService.create(body.email, body.password);
    }
    
    @Get('/:id')
    async findUser(@Param('id') id: string): Promise<User> {
        console.log('Handler is running.');
        const user = await this.usersService.findOne(parseInt(id));

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        return this.usersService.findOne(parseInt(id));
    }

    @Get()
    findAllUsers(@Query('email') email: string): Promise<User[]> {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string): Promise<User> {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto): Promise<User> {
        return this.usersService.update(parseInt(id), body);
    }
}
