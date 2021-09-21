import { client } from '@/shared/config/apollo-client';
import {
  CreateUserDocument,
  DeleteUserDocument,
  GetAuthoritiesDocument,
  GetUserDocument,
  GetUsersDocument,
  UpdateUserDocument,
} from '@/entities/user/user.gql';
import { buildPaginationOptions, toHttpResponse, toPagedHttpResponse } from '@/shared/graphql/graphql.util';

export default class UserGraphQLService {
  public get(userId: number): Promise<any> {
    return client.query({ query: GetUserDocument, variables: { login: userId } }).then(res => toHttpResponse(res));
  }

  public create(user): Promise<any> {
    return client.mutate({ mutation: CreateUserDocument, variables: { user } }).then(res => toHttpResponse(res));
  }

  public update(user): Promise<any> {
    return client.mutate({ mutation: UpdateUserDocument, variables: { user } }).then(res => toHttpResponse(res));
  }

  public remove(userId: number): Promise<any> {
    return client.mutate({ mutation: DeleteUserDocument, variables: { login: userId } }).then(res => toHttpResponse(res));
  }

  public retrieve(req?: any): Promise<any> {
    return client
      .query({
        query: GetUsersDocument,
        variables: buildPaginationOptions(req),
        fetchPolicy: req?.bypassCache ? 'no-cache' : 'cache-first',
      })
      .then(res => toPagedHttpResponse(res));
  }

  public retrieveAuthorities(): Promise<any> {
    return client.query({ query: GetAuthoritiesDocument }).then(res => toHttpResponse(res));
  }
}
