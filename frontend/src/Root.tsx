import './styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
const queryClient = new QueryClient();

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>,
  );
}

export default render;
