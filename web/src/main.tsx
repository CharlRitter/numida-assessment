import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@/tailwind.css'
import '@/main.scss'
import App from '@/App.tsx'

const client = new ApolloClient({
  uri: "http://localhost:2024/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
)
