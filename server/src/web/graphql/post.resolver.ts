/* eslint-disable id-blacklist */
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver, ResolveField, Mutation, Parent, Subscription } from '@nestjs/graphql';
import { PostService } from '../../service/post.service';
import { PaginationArgs } from './pagination-util';
import { CreatePostArgs, UpdatePostArgs } from '../../service/graphql/post.input-type';
import { Post, PaginatedPost } from '../../service/graphql/post.object-type';
import { PageRequest } from '../../domain/base/pagination.entity';
import { pageRequestToFindManyOptions } from './pagination-util';
import { PubSubService } from '../../service/graphql/pub-sub.service';
import { AuthGuard, RolesGuard } from '../../security';
import { transformField } from './field-resolver-util';

@UseGuards(AuthGuard, RolesGuard)
@Resolver(() => Post)
export class PostResolver {
    constructor(private postService: PostService, private pubSub: PubSubService) {}

    @Query(() => PaginatedPost)
    async getPosts(@Args() options: PaginationArgs): Promise<PaginatedPost> {
        const pageRequest: PageRequest = new PageRequest(options.page, options.size, options.sort);
        return this.postService
            .findAndCount(pageRequestToFindManyOptions(pageRequest))
            .then(([results, count]) => new PaginatedPost(results, count, true));
    }

    @Query(() => Post)
    async getPost(@Args('id') id: number): Promise<Post> {
        return this.postService.findById(id);
    }

    @Mutation(() => Post)
    async createPost(@Args('post') post: CreatePostArgs): Promise<Post> {
        return await this.postService.save(post);
    }

    @Mutation(() => Post)
    async updatePost(@Args('post') post: UpdatePostArgs): Promise<Post> {
        return await this.postService.update(post);
    }

    @Mutation(() => Number)
    async deletePost(@Args('id') id: number): Promise<number> {
        await this.postService.deleteById(id);
        return id;
    }

    @ResolveField()
    content(@Parent() post: Post, @Args('length', { nullable: true }) length?: number) {
        return transformField(post.content, [{ operation: 'substring', args: [0, length] }]);
    }

    @Subscription(() => Number)
    postsUpdated(): AsyncIterator<Number> {
        return this.pubSub.asyncIterator('posts');
    }
}
