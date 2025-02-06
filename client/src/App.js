import React from "react";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/AuthProvider";
import { QueryClientProvider, QueryClient } from "react-query";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="appWrapper">
          <AppRouter />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
