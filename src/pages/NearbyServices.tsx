
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/contexts/ThemeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building, Phone, MapPin, Clock, Star, Search, 
  Navigation, Hospital, Store, Ambulance, Heart, Microscope 
} from "lucide-react";

const NearbyServices = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample data for hospitals
  const hospitals = [
    {
      name: "General City Hospital",
      address: "123 Medical Center Dr, City, State 12345",
      phone: "(555) 123-4567",
      distance: "2.3 miles",
      rating: 4.5,
      hours: "24/7 Emergency Services",
      services: ["Emergency", "Surgery", "Cardiology", "Pediatrics", "Orthopedics"],
      image: "hospital1.jpg"
    },
    {
      name: "University Medical Center",
      address: "456 University Blvd, City, State 12345",
      phone: "(555) 987-6543",
      distance: "3.8 miles",
      rating: 4.8,
      hours: "24/7 Emergency Services",
      services: ["Emergency", "Oncology", "Neurology", "Obstetrics", "Research"],
      image: "hospital2.jpg"
    },
    {
      name: "Community Health Hospital",
      address: "789 Community Way, City, State 12345",
      phone: "(555) 456-7890",
      distance: "5.1 miles",
      rating: 4.2,
      hours: "24/7 Emergency Services",
      services: ["Emergency", "Family Medicine", "Physical Therapy", "Mental Health"],
      image: "hospital3.jpg"
    }
  ];
  
  // Sample data for pharmacies
  const pharmacies = [
    {
      name: "City Pharmacy",
      address: "100 Main St, City, State 12345",
      phone: "(555) 222-3333",
      distance: "0.8 miles",
      rating: 4.3,
      hours: "Mon-Fri: 8am-9pm, Sat-Sun: 9am-6pm",
      services: ["Prescription Filling", "Immunizations", "Health Screenings"],
      image: "pharmacy1.jpg"
    },
    {
      name: "MedQuick Pharmacy",
      address: "250 Market St, City, State 12345",
      phone: "(555) 444-5555",
      distance: "1.5 miles",
      rating: 4.1,
      hours: "Mon-Sun: 8am-10pm",
      services: ["Prescription Filling", "Delivery", "Compounding", "Medical Supplies"],
      image: "pharmacy2.jpg"
    },
    {
      name: "Health Plus Pharmacy",
      address: "375 Center Ave, City, State 12345",
      phone: "(555) 666-7777",
      distance: "2.2 miles",
      rating: 4.6,
      hours: "Mon-Fri: 7am-9pm, Sat: 8am-7pm, Sun: 9am-5pm",
      services: ["Prescription Filling", "Immunizations", "Medical Equipment", "Consultations"],
      image: "pharmacy3.jpg"
    }
  ];
  
  // Filter hospitals based on search query
  const filteredHospitals = hospitals.filter((hospital) => 
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Filter pharmacies based on search query
  const filteredPharmacies = pharmacies.filter((pharmacy) => 
    pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pharmacy.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 text-yellow-400" />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : ''}`}>Nearby Services</h1>
          <p className="text-muted-foreground">Find healthcare services near your location</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className={`absolute left-3 top-2.5 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
          <Input
            placeholder="Search hospitals, pharmacies, or services..."
            className={`pl-9 w-full ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="hospitals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
          <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
          <TabsTrigger value="urgent">Urgent Care</TabsTrigger>
          <TabsTrigger value="specialists">Specialists</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hospitals" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Hospital className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <CardTitle>Nearby Hospitals</CardTitle>
              </div>
              <CardDescription>Hospitals and medical centers in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredHospitals.length > 0 ? (
                  filteredHospitals.map((hospital, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className={`w-full md:w-24 h-24 rounded-lg mb-3 md:mb-0 md:mr-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                          <Hospital className={`h-12 w-12 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{hospital.name}</h3>
                              <div className="flex items-center mt-1">
                                {renderStars(hospital.rating)}
                                <span className="ml-2 text-sm text-muted-foreground">{hospital.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center mt-2 md:mt-0">
                              <Navigation className="h-4 w-4 mr-1 text-health-primary" />
                              <span className="text-sm font-medium text-health-primary">{hospital.distance}</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 space-y-2">
                            <div className="flex items-start">
                              <MapPin className="h-4 w-4 mr-1 mt-0.5 text-muted-foreground" />
                              <span className="text-sm">{hospital.address}</span>
                            </div>
                            <div className="flex items-start">
                              <Phone className="h-4 w-4 mr-1 mt-0.5 text-muted-foreground" />
                              <span className="text-sm">{hospital.phone}</span>
                            </div>
                            <div className="flex items-start">
                              <Clock className="h-4 w-4 mr-1 mt-0.5 text-muted-foreground" />
                              <span className="text-sm">{hospital.hours}</span>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-2">Services:</p>
                            <div className="flex flex-wrap gap-2">
                              {hospital.services.map((service, i) => (
                                <span 
                                  key={i} 
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-4 flex space-x-2">
                            <Button size="sm">
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button variant="outline" size="sm">
                              <Navigation className="h-4 w-4 mr-1" />
                              Directions
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Hospital className={`h-12 w-12 mx-auto mb-3 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                    <p className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>No hospitals found</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try adjusting your search query
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pharmacies" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Store className={`h-5 w-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                <CardTitle>Nearby Pharmacies</CardTitle>
              </div>
              <CardDescription>Pharmacies and drug stores in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPharmacies.length > 0 ? (
                  filteredPharmacies.map((pharmacy, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className={`w-full md:w-24 h-24 rounded-lg mb-3 md:mb-0 md:mr-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                          <Store className={`h-12 w-12 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{pharmacy.name}</h3>
                              <div className="flex items-center mt-1">
                                {renderStars(pharmacy.rating)}
                                <span className="ml-2 text-sm text-muted-foreground">{pharmacy.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center mt-2 md:mt-0">
                              <Navigation className="h-4 w-4 mr-1 text-health-primary" />
                              <span className="text-sm font-medium text-health-primary">{pharmacy.distance}</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 space-y-2">
                            <div className="flex items-start">
                              <MapPin className="h-4 w-4 mr-1 mt-0.5 text-muted-foreground" />
                              <span className="text-sm">{pharmacy.address}</span>
                            </div>
                            <div className="flex items-start">
                              <Phone className="h-4 w-4 mr-1 mt-0.5 text-muted-foreground" />
                              <span className="text-sm">{pharmacy.phone}</span>
                            </div>
                            <div className="flex items-start">
                              <Clock className="h-4 w-4 mr-1 mt-0.5 text-muted-foreground" />
                              <span className="text-sm">{pharmacy.hours}</span>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-2">Services:</p>
                            <div className="flex flex-wrap gap-2">
                              {pharmacy.services.map((service, i) => (
                                <span 
                                  key={i} 
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-4 flex space-x-2">
                            <Button size="sm">
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button variant="outline" size="sm">
                              <Navigation className="h-4 w-4 mr-1" />
                              Directions
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Store className={`h-12 w-12 mx-auto mb-3 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                    <p className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>No pharmacies found</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try adjusting your search query
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="urgent" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Ambulance className={`h-5 w-5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                <CardTitle>Urgent Care Centers</CardTitle>
              </div>
              <CardDescription>Urgent care facilities in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Ambulance className={`h-12 w-12 mx-auto mb-3 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>Coming Soon</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                  We're working on adding urgent care centers to our database. Check back soon for updates.
                </p>
                <Button className="mt-4">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Emergency Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="specialists" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Microscope className={`h-5 w-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                <CardTitle>Medical Specialists</CardTitle>
              </div>
              <CardDescription>Find specialized healthcare providers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {["Cardiologist", "Dermatologist", "Neurologist", "Orthopedic", "Pediatrician", "Psychiatrist", "Gynecologist", "Ophthalmologist", "ENT Specialist"].map((specialist, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-200 bg-white hover:bg-gray-50'} flex items-center justify-between cursor-pointer transition-colors`}
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-100'}`}>
                        <Heart className={`h-4 w-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                      </div>
                      <span className="ml-3 font-medium">{specialist}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Looking for a specific specialist? Contact your insurance provider for in-network options.
                </p>
                <Button variant="outline" className="mt-4">
                  <Building className="h-4 w-4 mr-2" />
                  Find More Specialists
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NearbyServices;
