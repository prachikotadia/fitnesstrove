
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import HealthHistory from "./pages/HealthHistory";
import VaccineRecords from "./pages/VaccineRecords";
import HealthInsurance from "./pages/HealthInsurance";
import NearbyServices from "./pages/NearbyServices";
import Allergies from "./pages/Allergies";

// Layout
import DashboardLayout from "./components/layout/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Redirect root to dashboard or login */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  {/* Health history */}
                  <Route path="/dashboard/history" element={<HealthHistory />} />
                  {/* Vaccine records */}
                  <Route path="/dashboard/vaccines" element={<VaccineRecords />} />
                  {/* Health insurance */}
                  <Route path="/dashboard/insurance" element={<HealthInsurance />} />
                  {/* Nearby services */}
                  <Route path="/dashboard/nearby" element={<NearbyServices />} />
                  {/* Allergies */}
                  <Route path="/dashboard/allergies" element={<Allergies />} />
                  {/* Additional dashboard routes kept the same */}
                  <Route path="/dashboard/activity" element={<Dashboard />} />
                  <Route path="/dashboard/nutrition" element={<Dashboard />} />
                  <Route path="/dashboard/workouts" element={<Dashboard />} />
                  <Route path="/dashboard/sleep" element={<Dashboard />} />
                  <Route path="/dashboard/assistant" element={<Dashboard />} />
                  <Route path="/dashboard/profile" element={<Dashboard />} />
                  <Route path="/dashboard/settings" element={<Dashboard />} />
                </Route>
              </Route>
              
              {/* Not Found route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
