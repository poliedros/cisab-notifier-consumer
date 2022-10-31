export interface NotifyStrategy {
  send(body: string): Promise<void>;
}
