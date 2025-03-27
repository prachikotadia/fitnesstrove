
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/contexts/ThemeContext";
import { AlertCircle, Plus, Search, AlertTriangle, X, Shield, Info, Edit } from "lucide-react";

const Allergies = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample data
  const allergies = [
    { 
      name: "Penicillin", 
      severity: "Severe", 
      reaction: "Hives, difficulty breathing, swelling",
      diagnosed: "2015-03-15",
      notes: "Avoid all penicillin-based antibiotics. Emergency plan in place."
    },
    { 
      name: "Peanuts", 
      severity: "Severe", 
      reaction: "Anaphylaxis, swelling, rash",
      diagnosed: "2008-07-22",
      notes: "Carries EpiPen at all times. Avoid all nut products."
    },
    { 
      name: "Latex", 
      severity: "Moderate", 
      reaction: "Contact dermatitis, itching, redness",
      diagnosed: "2019-11-10",
      notes: "Inform healthcare providers before procedures."
    },
    { 
      name: "Dust Mites", 
      severity: "Mild", 
      reaction: "Sneezing, runny nose, itchy eyes",
      diagnosed: "2017-05-03",
      notes: "Managed with over-the-counter antihistamines."
    }
  ];
  
  // Filter allergies based on search query
  const filteredAllergies = allergies.filter((allergy) => 
    allergy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    allergy.reaction.toLowerCase().includes(searchQuery.toLowerCase()) ||
    allergy.severity.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "severe":
        return theme === 'dark' ? "bg-red-900 text-red-300" : "bg-red-100 text-red-800";
      case "moderate":
        return theme === 'dark' ? "bg-yellow-900 text-yellow-300" : "bg-yellow-100 text-yellow-800";
      case "mild":
        return theme === 'dark' ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-800";
      default:
        return theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : ''}`}>Allergies</h1>
          <p className="text-muted-foreground">Manage your allergies and sensitivities</p>
        </div>
        <Button className="bg-health-primary hover:bg-health-secondary">
          <Plus className="mr-2 h-4 w-4" />
          Add Allergy
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-800/30' : 'bg-red-50 border border-red-100'}`}>
          <div className="flex items-center space-x-2">
            <AlertTriangle className={`h-5 w-5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
            <h3 className={`font-medium ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>Severe Allergies</h3>
          </div>
          <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-red-300' : 'text-red-600'}`}>
            2 severe allergies that require immediate medical attention if exposed
          </p>
        </div>
        
        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-800/30' : 'bg-yellow-50 border border-yellow-100'}`}>
          <div className="flex items-center space-x-2">
            <AlertCircle className={`h-5 w-5 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
            <h3 className={`font-medium ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}>Food Allergies</h3>
          </div>
          <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'}`}>
            1 food allergy requiring dietary restrictions and precautions
          </p>
        </div>
        
        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-800/30' : 'bg-blue-50 border border-blue-100'}`}>
          <div className="flex items-center space-x-2">
            <Shield className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            <h3 className={`font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>Medical Alert</h3>
          </div>
          <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
            Medical alert information available for emergency responders
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Allergy List</CardTitle>
              <CardDescription>Your documented allergies and sensitivities</CardDescription>
            </div>
            <div className="mt-4 md:mt-0 relative">
              <Search className={`absolute left-2 top-2.5 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              <Input
                placeholder="Search allergies..."
                className={`pl-8 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAllergies.length > 0 ? (
              filteredAllergies.map((allergy, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full mt-0.5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-red-100'}`}>
                        <AlertCircle className={`h-5 w-5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center">
                          <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{allergy.name}</h3>
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getSeverityColor(allergy.severity)}`}>
                            {allergy.severity}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Diagnosed: {allergy.diagnosed}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 md:mt-0 flex space-x-2">
                      <Button variant="outline" size="sm" className="h-8">
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-red-500 hover:text-red-600">
                        <X className="h-3.5 w-3.5 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 ml-10">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Reaction</p>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{allergy.reaction}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground">Notes</p>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{allergy.notes}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <AlertCircle className={`h-12 w-12 mx-auto mb-3 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>No allergies found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search query or add a new allergy
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Info className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            <CardTitle>Emergency Information</CardTitle>
          </div>
          <CardDescription>Important information for medical emergencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
            <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>Emergency Contacts</h3>
            
            <div className="mt-3 space-y-3">
              <div className="flex items-start">
                <div className={`p-1 rounded-full mt-0.5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'}`}>
                  <Phone className={`h-4 w-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div className="ml-2">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>Mary Johnson (Spouse)</p>
                  <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className={`p-1 rounded-full mt-0.5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'}`}>
                  <User className={`h-4 w-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div className="ml-2">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>Dr. Sarah Williams</p>
                  <p className="text-sm text-muted-foreground">(555) 987-6543</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>Emergency Medications</h3>
              
              <div className="mt-3 space-y-3">
                <div className="flex items-start">
                  <div className={`p-1 rounded-full mt-0.5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-red-100'}`}>
                    <Syringe className={`h-4 w-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                  </div>
                  <div className="ml-2">
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>EpiPen</p>
                    <p className="text-sm text-muted-foreground">For severe allergic reactions</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className={`p-1 rounded-full mt-0.5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-100'}`}>
                    <Pill className={`h-4 w-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>
                  <div className="ml-2">
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>Benadryl</p>
                    <p className="text-sm text-muted-foreground">For mild allergic reactions</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit Emergency Info
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import { User, Phone, Syringe, Pill } from "lucide-react";

export default Allergies;
