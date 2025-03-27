
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Menu, X, Home, Activity, Utensils, DumbbellIcon, Moon, MessageSquare, 
  User, Bell, Settings, Heart, LogOut, Sun, History, 
  Syringe, Shield, Building, Map, Hospital, Store, AlertCircle
} from "lucide-react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Activity", href: "/dashboard/activity", icon: Activity },
    { name: "Nutrition", href: "/dashboard/nutrition", icon: Utensils },
    { name: "Workouts", href: "/dashboard/workouts", icon: DumbbellIcon },
    { name: "Sleep", href: "/dashboard/sleep", icon: Moon },
    { name: "Health History", href: "/dashboard/history", icon: History },
    { name: "Vaccine Records", href: "/dashboard/vaccines", icon: Syringe },
    { name: "Health Insurance", href: "/dashboard/insurance", icon: Shield },
    { name: "Nearby Services", href: "/dashboard/nearby", icon: Map },
    { name: "Allergies", href: "/dashboard/allergies", icon: AlertCircle },
    { name: "AI Assistant", href: "/dashboard/assistant", icon: MessageSquare },
  ];

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-gray-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 transform ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex lg:flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className={`flex items-center justify-between px-4 py-5 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-2">
            <Heart className={`h-6 w-6 ${theme === 'dark' ? 'text-health-accent' : 'text-health-primary'}`} />
            <span className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>HealthAssist AI</span>
          </div>
          <button
            className={`rounded-md p-1 -mr-1 lg:hidden ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-gray-700 text-health-accent'
                        : 'bg-health-accent/20 text-health-primary'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive
                        ? theme === 'dark'
                          ? 'text-health-accent'
                          : 'text-health-primary'
                        : theme === 'dark'
                          ? 'text-gray-400'
                          : 'text-gray-500'
                    }`}
                  />
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>

        <div className={`px-4 py-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={currentUser?.avatar} alt={currentUser?.name || "User"} />
              <AvatarFallback className={`${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-health-primary text-white'}`}>
                {currentUser?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{currentUser?.name}</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{currentUser?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
          <div className="px-4 h-16 flex items-center justify-between">
            <button
              className={`lg:hidden rounded-md p-2 ${theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex-1 lg:ml-0 lg:flex-none" />

            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleTheme}
                className={theme === 'dark' ? 'border-gray-700' : ''}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button variant="outline" size="icon" className={`relative ${theme === 'dark' ? 'border-gray-700' : ''}`}>
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-health-red" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar>
                      <AvatarImage src={currentUser?.avatar} alt={currentUser?.name || "User"} />
                      <AvatarFallback className={`${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-health-primary text-white'}`}>
                        {currentUser?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/dashboard/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/dashboard/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-600" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className={`flex-1 overflow-y-auto ${theme === 'dark' ? 'bg-gray-900' : 'bg-health-background'} p-4 md:p-6`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
