import { Global, Module } from '@nestjs/common';
import { GraphQLModule as NestJSGraphQLModule, GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';
import { PubSubService } from '../service/graphql/pub-sub.service';

function getGraphQLOptions(): GqlModuleOptions {
    const options: GqlModuleOptions = {
        installSubscriptionHandlers: true,
        buildSchemaOptions: {
            numberScalarMode: 'integer',
        },
        context: ctx => ({ req: ctx.req || ctx.connection.context }),
    };
    const schemaLocation = join(process.cwd(), '..', 'server/schema.gql');
    const isNestCLI = process.env.npm_lifecycle_script?.includes('nest start');
    if (isNestCLI) {
        options.autoSchemaFile = schemaLocation;
    } else {
        options.typePaths = [schemaLocation];
    }
    return options;
}

@Global()
@Module({
    imports: [NestJSGraphQLModule.forRoot(getGraphQLOptions())],
    providers: [PubSubService],
    exports: [PubSubService],
})
export class GraphQLModule {}
