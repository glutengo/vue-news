/* eslint-disable max-classes-per-file*/
import { Paginated } from './paginated.object-type';
import { UserDTO } from '../dto/user.dto';
import { Field, ObjectType, PartialType } from '@nestjs/graphql';

@ObjectType()
export class PartialUser extends PartialType(UserDTO) {}

@ObjectType()
export class User extends PartialUser {
    @Field({ nullable: true })
    id?: number;
}

@ObjectType()
export class PaginatedUser extends Paginated(User) {}
/* eslint-enable max-classes-per-file*/
