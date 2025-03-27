
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { X, Send, Loader2, Heart } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI health assistant. How can I help you today?",
    timestamp: new Date(),
  },
];

interface HealthChatProps {
  onClose: () => void;
}

const HealthChat = ({ onClose }: HealthChatProps) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggestions for common health questions
  const suggestions = [
    "How can I improve my sleep?",
    "What's a good workout for beginners?",
    "How much water should I drink daily?",
    "What are healthy breakfast options?",
    "How can I reduce stress naturally?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Generate AI response based on user input
      let response: Message;
      
      // Simple response logic for demo
      if (input.toLowerCase().includes("sleep")) {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "For better sleep, try to maintain a consistent schedule, create a relaxing bedtime routine, limit screen time before bed, and ensure your bedroom is dark, quiet, and cool. Aim for 7-8 hours of sleep each night.",
          timestamp: new Date(),
        };
      } else if (input.toLowerCase().includes("workout") || input.toLowerCase().includes("exercise")) {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "For beginners, I recommend starting with a mix of cardio (walking, cycling) and basic strength exercises like squats, push-ups, and planks. Start with 20-30 minutes, 3 times a week, and gradually increase as you build stamina.",
          timestamp: new Date(),
        };
      } else if (input.toLowerCase().includes("water")) {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "The general recommendation is to drink about 8 glasses (64 ounces) of water daily, but your needs may vary based on activity level, climate, and overall health. A good rule is to drink when thirsty and aim for pale yellow urine color.",
          timestamp: new Date(),
        };
      } else if (input.toLowerCase().includes("breakfast") || input.toLowerCase().includes("meal")) {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Healthy breakfast options include oatmeal with fruits, Greek yogurt with nuts and berries, whole grain toast with avocado, or a vegetable omelet. Try to include protein, fiber, and healthy fats for sustained energy.",
          timestamp: new Date(),
        };
      } else if (input.toLowerCase().includes("stress")) {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "To reduce stress naturally, try deep breathing exercises, regular physical activity, meditation, limiting caffeine and alcohol, and ensuring adequate sleep. Setting boundaries and practicing mindfulness can also help manage daily stressors.",
          timestamp: new Date(),
        };
      } else {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I understand you're asking about health advice. While I can provide general wellness information, always consult with healthcare professionals for personalized medical guidance. Is there a specific health topic you'd like to learn more about?",
          timestamp: new Date(),
        };
      }
      
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md h-[600px] max-h-[90vh] flex flex-col">
        <CardHeader className="border-b border-gray-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-health-primary flex items-center justify-center mr-3">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <CardTitle className="text-lg">AI Health Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start max-w-[80%] ${
                    message.role === "user"
                      ? "flex-row-reverse"
                      : "flex-row"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-health-primary text-white">
                        AI
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="h-8 w-8 ml-2">
                      <AvatarImage 
                        src={currentUser?.avatar} 
                        alt={currentUser?.name || "User"} 
                      />
                      <AvatarFallback className="bg-gray-200">
                        {currentUser?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg py-2 px-3 ${
                      message.role === "user"
                        ? "bg-health-primary text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-health-primary text-white">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg py-2 px-3 bg-gray-100">
                    <Loader2 className="h-5 w-5 animate-spin text-health-primary" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {messages.length === 1 && !isLoading && (
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-2">Try asking about:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setInput(suggestion);
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="border-t border-gray-100 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              type="text"
              placeholder="Type your health question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="bg-health-primary hover:bg-health-secondary"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HealthChat;
