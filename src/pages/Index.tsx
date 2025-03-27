
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-health-background'}`}>
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-health-primary"></div>
    </div>
  );
};

export default Index;
