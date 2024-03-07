import { Providers } from '@/components/providers';
import { AppRoutes } from '@/components/router/app-routes';

import { Layout } from '@/components/ui/layout/layout';

export const App = () => (
  <Providers>
    <Layout>
      <AppRoutes />
    </Layout>
  </Providers>
);
