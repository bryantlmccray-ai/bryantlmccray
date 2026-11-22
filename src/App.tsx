import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import StoryPage from "./pages/StoryPage";
import Index from "./pages/Index";
import About from "./pages/About";
import Work from "./pages/Work";
import Writing from "./pages/Writing";
import WritingStory from "./pages/WritingStory";
import Experience from "./pages/Experience";
import McCrayVentures from "./pages/McCrayVentures";
import CareerPage from "./pages/CareerPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/stories/:slug" element={<StoryPage />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/writing/:slug" element={<WritingStory />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/mccray-ventures" element={<McCrayVentures />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
