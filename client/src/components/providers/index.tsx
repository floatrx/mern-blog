import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { persistor, store } from '@/store/store';

export const Providers = (props: PropsWithChildren) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider defaultTheme="system">
        <BrowserRouter>{props.children}</BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
