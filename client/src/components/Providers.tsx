import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export const Providers = (props: PropsWithChildren) => (
  <BrowserRouter>
    <Provider store={store}>{props.children}</Provider>
  </BrowserRouter>
);
