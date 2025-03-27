
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  googleLogin: () => Promise<void>;
  appleLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated user data for demo purposes
const DEMO_USERS = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123',
    avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=0EA5E9&color=fff'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('healthUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user (for demo)
      const user = DEMO_USERS.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
        localStorage.setItem('healthUser', JSON.stringify(userWithoutPassword));
        toast.success("Welcome back!");
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists (for demo)
      if (DEMO_USERS.some(u => u.email === email)) {
        throw new Error('User already exists');
      }
      
      // In a real app, you would send this to your backend
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=0EA5E9&color=fff`
      };
      
      setCurrentUser(newUser);
      localStorage.setItem('healthUser', JSON.stringify(newUser));
      toast.success("Account created successfully!");
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || "Registration failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('healthUser');
    toast.info("You've been logged out");
    navigate('/login');
  };

  const googleLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate OAuth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const googleUser = {
        id: 'google-123',
        name: 'Google User',
        email: 'google@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Google+User&background=0EA5E9&color=fff'
      };
      
      setCurrentUser(googleUser);
      localStorage.setItem('healthUser', JSON.stringify(googleUser));
      toast.success("Logged in with Google!");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Google login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const appleLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate OAuth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const appleUser = {
        id: 'apple-123',
        name: 'Apple User',
        email: 'apple@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Apple+User&background=0EA5E9&color=fff'
      };
      
      setCurrentUser(appleUser);
      localStorage.setItem('healthUser', JSON.stringify(appleUser));
      toast.success("Logged in with Apple!");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Apple login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, login, register, logout, googleLogin, appleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
