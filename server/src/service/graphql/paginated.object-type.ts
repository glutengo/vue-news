/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-misused-new */
/* eslint-disable id-blacklist */
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { BaseDTO } from '../dto/base.dto';

export interface IPaginated<T, E> {
    new (nodes: T[], totalCount: number, hasNextPage: boolean): IPaginated<T, E>;
    edges: E[];
    totalCount: number;
    hasNextPage: boolean;
}

export interface IEdge<T> {
    cursor: string;
    node: T;
}

export function Paginated<T extends BaseDTO>(classRef: Type<T>): IPaginated<T, IEdge<T>> {
    @ObjectType(`${classRef.name}Edge`)
    class EdgeType {
        @Field(() => String, { nullable: true })
        cursor?: string;

        @Field(() => classRef)
        node: T;
    }

    @ObjectType({ isAbstract: true })
    class PaginatedType {
        constructor(nodes: T[], totalCount: number, hasNextPage: boolean) {
            this.edges = nodes.map(node => ({ node, cursor: new Buffer(node.id).toString('base64') }));
            this.totalCount = totalCount;
            this.hasNextPage = hasNextPage;
        }

        @Field(() => [EdgeType])
        edges: EdgeType[];

        @Field(() => Int, { nullable: true })
        totalCount?: number;

        @Field({ nullable: true })
        hasNextPage?: boolean;
    }

    return PaginatedType as IPaginated<T, IEdge<T>>;
}
