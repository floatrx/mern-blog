import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { store } from '@/store/store';

export const Providers = (props: PropsWithChildren) => (
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>{props.children}</ThemeProvider>
    </Provider>
  </BrowserRouter>
);
