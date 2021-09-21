/* eslint-disable id-blacklist */
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from '../../service/user.service';
import { PaginationArgs } from './pagination-util';
import { PageRequest } from '../../domain/base/pagination.entity';
import { PaginatedUser, User } from '../../service/graphql/user.object-type';
import { CreateUserArgs, UpdateUserArgs } from '../../service/graphql/user.input-type';
import { pageRequestToFindManyOptions } from './pagination-util';
import { PubSubService } from '../../service/graphql/pub-sub.service';
import { AuthGuard, AuthUser, RolesGuard } from '../../security';

@UseGuards(AuthGuard, RolesGuard)
@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService, private pubSub: PubSubService) {}

    @Query(() => PaginatedUser)
    async getUsers(@Args() options: PaginationArgs): Promise<PaginatedUser> {
        const pageRequest = new PageRequest(options.page, options.size, options.sort);
        return this.userService
            .findAndCount(pageRequestToFindManyOptions(pageRequest))
            .then(([users, count]) => new PaginatedUser(users, count, false));
    }

    @Query(() => User)
    async getUser(@Args('login') login: string): Promise<User> {
        return this.userService.find({ where: { login } });
    }

    @Mutation(() => User)
    async createUser(@Args('user') user: CreateUserArgs): Promise<User> {
        return this.userService.save({ ...user, password: user.login });
    }

    @Mutation(() => User)
    async updateUser(@Args('user') user: UpdateUserArgs): Promise<User> {
        const userOnDb = await this.userService.find({ where: { user: user.login } });
        if (userOnDb && userOnDb.id) {
            user.id = userOnDb.id;
        }
        return this.userService.update(user);
    }

    @Mutation(() => User)
    async deleteUser(@Args('login') login: string): Promise<User> {
        const userToDelete = await this.userService.find({ where: { login } });
        return await this.userService.delete(userToDelete);
    }

    @Query(() => [String])
    getAuthorities(@AuthUser() user: any): any {
        if (!user) {
            return [];
        }
        return user.authorities;
    }

    @Subscription(() => Number)
    usersUpdated(): AsyncIterator<number> {
        return this.pubSub.asyncIterator('users');
    }
}
