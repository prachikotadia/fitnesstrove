
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/contexts/ThemeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Check, Download, FileText, Plus, Search, Shield, Syringe } from "lucide-react";

const VaccineRecords = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample data
  const vaccines = [
    { 
      name: "COVID-19 Vaccine", 
      type: "mRNA",
      date: "2023-04-15", 
      manufacturer: "Pfizer-BioNTech",
      dose: "2nd dose", 
      provider: "Community Health Center",
      lotNumber: "EL0725",
      nextDose: "N/A"
    },
    { 
      name: "Influenza Vaccine", 
      type: "Inactivated",
      date: "2022-10-10", 
      manufacturer: "Sanofi Pasteur",
      dose: "Annual", 
      provider: "Local Pharmacy",
      lotNumber: "UJ548721",
      nextDose: "2023-10-10"
    },
    { 
      name: "Tetanus-Diphtheria (Td)", 
      type: "Toxoid",
      date: "2019-08-22", 
      manufacturer: "GlaxoSmithKline",
      dose: "Booster", 
      provider: "Dr. Johnson's Office",
      lotNumber: "AC34589",
      nextDose: "2029-08-22"
    },
    { 
      name: "Hepatitis B Vaccine", 
      type: "Recombinant",
      date: "2015-06-30", 
      manufacturer: "Merck",
      dose: "3rd dose", 
      provider: "University Health Services",
      lotNumber: "LM9735",
      nextDose: "N/A"
    }
  ];
  
  // Filter vaccines based on search query
  const filteredVaccines = vaccines.filter((vaccine) => 
    vaccine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vaccine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Recommended vaccines based on user profile
  const recommendedVaccines = [
    { name: "HPV Vaccine", reason: "Recommended for adults up to age 26" },
    { name: "Shingles Vaccine", reason: "Recommended for adults 50 years and older" },
    { name: "Pneumococcal Vaccine", reason: "Recommended for adults with certain medical conditions" }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : ''}`}>Vaccine Records</h1>
          <p className="text-muted-foreground">Manage and track your vaccination history</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-health-primary hover:bg-health-secondary">
            <Plus className="mr-2 h-4 w-4" />
            Add Vaccine
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Records
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Vaccination History</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Vaccines</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Vaccination Records</CardTitle>
                  <CardDescription>Your complete vaccination history</CardDescription>
                </div>
                <div className="mt-4 md:mt-0 relative">
                  <Search className={`absolute left-2 top-2.5 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  <Input
                    placeholder="Search vaccines..."
                    className={`pl-8 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredVaccines.length > 0 ? (
                  filteredVaccines.map((vaccine, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-green-100'}`}>
                            <Syringe className={`h-5 w-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                          </div>
                          <div>
                            <p className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{vaccine.name}</p>
                            <p className="text-sm text-muted-foreground">{vaccine.manufacturer} • {vaccine.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center mt-2 md:mt-0">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{vaccine.date}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Dose</p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{vaccine.dose}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Provider</p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{vaccine.provider}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Lot Number</p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{vaccine.lotNumber}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-between items-center">
                        <div>
                          {vaccine.nextDose !== "N/A" && (
                            <div className="flex items-center">
                              <span className="text-xs mr-2">Next dose:</span>
                              <span className={`text-xs font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                                {vaccine.nextDose}
                              </span>
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          View Certificate
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No vaccines matching your search</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Vaccinations</CardTitle>
              <CardDescription>Vaccines that are due soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'}`}>
                    <Syringe className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <p className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>Influenza Vaccine</p>
                    <p className="text-sm text-muted-foreground">Annual dose • Due on 2023-10-10</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button size="sm">Schedule Appointment</Button>
                </div>
              </div>
              
              <div className="mt-4 text-center py-6">
                <Shield className={`h-12 w-12 mx-auto mb-3 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>You're up to date!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  No other vaccines are due at this time
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vaccine Recommendations</CardTitle>
              <CardDescription>Based on your age, health status, and history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedVaccines.map((vaccine, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}
                  >
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full mt-0.5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-100'}`}>
                        <Shield className={`h-5 w-5 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
                      </div>
                      <div className="ml-3">
                        <p className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{vaccine.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">{vaccine.reason}</p>
                        <Button size="sm" className="mt-3">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-green-100'}`}>
                      <Check className={`h-5 w-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <div className="ml-3">
                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
                        Talk to your healthcare provider
                      </p>
                      <p className="text-sm text-muted-foreground">
                        For personalized vaccine recommendations based on your specific health needs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VaccineRecords;
