import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class PubSubService {
    private pubSub = new PubSub();

    publish(entity: string, payload: any): void {
        const triggerName = this.getTriggerName(entity);
        this.pubSub.publish(triggerName, { [triggerName]: payload });
    }

    asyncIterator(entity: string): AsyncIterator<any> {
        return this.pubSub.asyncIterator(this.getTriggerName(entity));
    }

    private getTriggerName(entity: string): string {
        return `${entity}Updated`;
    }
}
