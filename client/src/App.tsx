import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import axios from "axios"; 

const queryClient = new QueryClient();
const BASE_URL = `${import.meta.env.VITE_URL}`;
const App = () => {
  const keepServerAlive = () => {
    setInterval(async () => {
      try {
        await axios.get(BASE_URL); 
        console.log('Server pinged successfully!');
      } catch (error) {
        console.error('Error pinging server:', error);
      }
    }, 3 * 60 * 1000); 
  };

  useEffect(() => {
    keepServerAlive();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
