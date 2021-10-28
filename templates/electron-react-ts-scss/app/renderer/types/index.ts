import { RouterState as inRouterState  } from 'connected-react-router';

export interface RouterState {
  router: inRouterState;
}

export interface CounterState {
  count: number;
}

export interface StoreState {
  counter: CounterState;
}
