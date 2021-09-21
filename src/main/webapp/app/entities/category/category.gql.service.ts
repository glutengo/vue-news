import { client } from '@/shared/config/apollo-client';
import { buildPaginationOptions, toHttpResponse, toPagedHttpResponse } from '@/shared/graphql/graphql.util';
import { ICategory } from '@/shared/model/category.model';
import {
  CreateCategoryDocument,
  GetCategoryDocument,
  GetCategoriesDocument,
  DeleteCategoryDocument,
  UpdateCategoryDocument,
} from '@/graphql';

export default class CategoryService {
  public find(_id: any): Promise<ICategory> {
    const id = this.getId(_id);
    return client.query({ query: GetCategoryDocument, variables: { id } }).then(res => toHttpResponse(res).data);
  }

  public retrieve(req?: any): Promise<any> {
    return client
      .query({
        query: GetCategoriesDocument,
        variables: buildPaginationOptions(req),
        fetchPolicy: req?.bypassCache ? 'no-cache' : 'cache-first',
      })
      .then(res => toPagedHttpResponse(res));
  }

  public delete(_id: any): Promise<any> {
    const id = this.getId(_id);
    return client.mutate({ mutation: DeleteCategoryDocument, variables: { id } }).then(res => toHttpResponse(res).data);
  }

  public create(category: ICategory): Promise<ICategory> {
    return client.mutate({ mutation: CreateCategoryDocument, variables: { category } }).then(res => toHttpResponse(res).data);
  }

  public update(category: ICategory): Promise<ICategory> {
    return client.mutate({ mutation: UpdateCategoryDocument, variables: { category } }).then(res => toHttpResponse(res).data);
  }

  public partialUpdate(category: ICategory): Promise<ICategory> {
    return client.mutate({ mutation: UpdateCategoryDocument, variables: { category } }).then(res => toHttpResponse(res).data);
  }

  private getId(id: any): number {
    return parseInt(id, 10);
  }
}
