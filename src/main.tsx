import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserProvider } from "./hooks/UserContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <QueryClientProvider client={queryClient}>
   
        <App />
      
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </UserProvider>
);
