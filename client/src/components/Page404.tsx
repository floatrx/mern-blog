import { Ghost } from 'lucide-react';

export const Page404 = () => (
  <div className="flex h-full items-center justify-center">
    <h1 className="flex flex-col items-center">
      <Ghost size={120} className="text-cyan-500" />
      <br />
      <span className="text-3xl">404 - Not Found!</span>
      <p className="text-muted-foreground">The page you're looking for not found or not implemented yet...</p>
    </h1>
  </div>
);
