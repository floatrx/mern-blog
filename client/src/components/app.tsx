import { AppRoutes } from '@/components/router/app-routes';
import { Layout } from '@/components/ui/layout/layout';
import { Providers } from '@/components/providers';

export const App = () => (
  <Providers>
    <Layout>
      <AppRoutes />
    </Layout>
  </Providers>
);
