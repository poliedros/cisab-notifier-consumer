export interface NotifyStrategy {
  send(): Promise<void>;
}
