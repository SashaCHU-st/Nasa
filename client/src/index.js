import React from 'react';
import ReactDOM from 'react-dom/client';
//import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import App from './App';
// import { AuthProvider } from "./components/context/auth-context";


//const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <AuthProvider>
    //     <QueryClientProvider client={queryClient}>
            <App />
    //     </QueryClientProvider>
    // </AuthProvider>
);
//queryClient used for cash, sync, update, keps all requests to use it later
//  for cah keping it prevent extra request navigate between pages for 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
