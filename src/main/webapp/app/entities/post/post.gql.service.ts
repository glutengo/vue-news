import { client } from '@/shared/config/apollo-client';
import { buildPaginationOptions, toHttpResponse, toPagedHttpResponse } from '@/shared/graphql/graphql.util';
import { IPost } from '@/shared/model/post.model';
import { CreatePostDocument, GetPostDocument, GetPostsDocument, DeletePostDocument, UpdatePostDocument } from './post.gql';

export default class PostService {
  public find(_id: any): Promise<IPost> {
    const id = this.getId(_id);
    return client.query({ query: GetPostDocument, variables: { id } }).then(res => toHttpResponse(res).data);
  }

  public retrieve(req?: any): Promise<any> {
    return client
      .query({
        query: GetPostsDocument,
        variables: buildPaginationOptions(req),
        fetchPolicy: req?.bypassCache ? 'no-cache' : 'cache-first',
      })
      .then(res => toPagedHttpResponse(res));
  }

  public delete(_id: any): Promise<any> {
    const id = this.getId(_id);
    return client.mutate({ mutation: DeletePostDocument, variables: { id } }).then(res => toHttpResponse(res).data);
  }

  public create(post: IPost): Promise<IPost> {
    return client.mutate({ mutation: CreatePostDocument, variables: { post } }).then(res => toHttpResponse(res).data);
  }

  public update(post: IPost): Promise<IPost> {
    return client.mutate({ mutation: UpdatePostDocument, variables: { post } }).then(res => toHttpResponse(res).data);
  }

  public partialUpdate(post: IPost): Promise<IPost> {
    return client.mutate({ mutation: UpdatePostDocument, variables: { post } }).then(res => toHttpResponse(res).data);
  }

  private getId(id: any): number {
    return parseInt(id, 10);
  }
}
