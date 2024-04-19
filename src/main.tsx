import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./app/styles/index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/config/react-query/queryClient";

import "./app/config/i18n/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>
);
