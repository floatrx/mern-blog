import { App } from '@/components/App';
import { Providers } from '@/components/providers';
import { createRoot } from 'react-dom/client';

// Styles
import '@/styles/global.css';

createRoot(document.getElementById('root')!).render(
  <Providers>
    <App />
  </Providers>,
);
