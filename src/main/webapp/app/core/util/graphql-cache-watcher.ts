import { ApolloClient, gql, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { Subscribable } from './pub-sub';
import * as pluralize from 'pluralize';

export class GraphQLCacheWatcher {
  private subscriptions: Set<string> = new Set<string>();

  constructor(
    private client: ApolloClient<NormalizedCacheObject>,
    private cache: InMemoryCache,
    private knownQueries: Subscribable<string>,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private onEvict: (entity: string) => any = () => {}
  ) {}

  connect(): void {
    this.knownQueries.subscribe(name => {
      this.watchQuery(name);
    });
  }

  evict(fieldName: string): void {
    this.cache.evict({ fieldName });
  }

  private extractEntity(queryName: string): string {
    let result = queryName;
    const QUERY_PREFIX = 'get';
    if (queryName.startsWith(QUERY_PREFIX)) {
      result = pluralize.singular(queryName.substring(QUERY_PREFIX.length));
    }
    return result;
  }

  private getSubscriptionName(entity: string): string {
    return `${pluralize.plural(entity).toLowerCase()}Updated`;
  }

  private getRelevantCacheKeys(entity: string): string[] {
    const GET_ENTITY = `get${entity}`;
    const GET_ENTITIES = `get${pluralize.plural(entity)}`;
    return Object.keys((this.cache as any).data.data.ROOT_QUERY).filter(k => k.startsWith(GET_ENTITY) || k.startsWith(GET_ENTITIES));
  }

  private hasCacheEntry(key: string): boolean {
    return !!Object.keys((this.cache as any).data.data.ROOT_QUERY).find(k => k.startsWith(key));
  }

  private watchQuery(queryName: string): void {
    const entity = this.extractEntity(queryName);
    const q = this.getSubscriptionName(entity);
    if (!this.subscriptions.has(q)) {
      this.subscriptions.add(q);
      const query = gql`subscription { ${q} }`;
      this.client.subscribe({ query }).subscribe(() => {
        this.getRelevantCacheKeys(entity).forEach(fieldName => this.cache.evict({ fieldName }));
        setTimeout(() => {
          // update UI if data is not updated after waiting for 1 second
          if (!this.hasCacheEntry(queryName)) {
            this.onEvict(entity);
          }
        }, 1000);
      });
    }
  }
}
