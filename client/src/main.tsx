import { App } from '@/components/App';
import { Providers } from '@/components/providers/Providers';
import { createRoot } from 'react-dom/client';

// Styles
import '@/global.css';

createRoot(document.getElementById('root')!).render(
  <Providers>
    <App />
  </Providers>,
);
