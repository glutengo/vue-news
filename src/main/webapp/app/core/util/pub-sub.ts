type SubscriberCallback<T> = (value: T) => void;

export interface Subscribable<T> {
  subscribe(callback: SubscriberCallback<T>): void;
  unsubscribe(callback: SubscriberCallback<T>): void;
}

export class PubSub<T> implements Subscribable<T> {
  private subscribers: Set<SubscriberCallback<T>> = new Set<SubscriberCallback<T>>();

  publish(value: T): void {
    this.subscribers.forEach(s => s(value));
  }

  subscribe(callback: SubscriberCallback<T>): void {
    this.subscribers.add(callback);
  }

  unsubscribe(callback: SubscriberCallback<T>): void {
    this.subscribers.delete(callback);
  }
}
