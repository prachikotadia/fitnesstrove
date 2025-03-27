
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardCheck, CreditCard, FileText, Phone, Plus, Building, Users, DollarSign, CalendarRange } from "lucide-react";

const HealthInsurance = () => {
  const { theme } = useTheme();
  
  // Sample insurance data
  const insuranceInfo = {
    provider: "Blue Cross Blue Shield",
    planName: "Premium Plus Family Plan",
    policyNumber: "BCBS-845721964",
    groupNumber: "GRP78452163",
    memberId: "XYZ123456789",
    effectiveDate: "2023-01-01",
    coverageType: "Family",
    primaryInsured: "John Doe",
    contactPhone: "1-800-555-1234",
    contactWebsite: "www.bcbs.com/members",
    benefits: {
      deductible: "$1,500 individual / $3,000 family",
      outOfPocketMax: "$5,000 individual / $10,000 family",
      primaryCare: "$25 copay",
      specialists: "$40 copay",
      emergency: "$250 copay",
      urgent: "$75 copay",
      prescription: "Tier 1: $10 / Tier 2: $30 / Tier 3: $50"
    },
    network: {
      primaryPhysician: "Dr. Sarah Johnson",
      inNetworkHospitals: ["Memorial Hospital", "University Medical Center", "Community Hospital"]
    }
  };
  
  // Sample claims data
  const recentClaims = [
    { date: "2023-09-15", provider: "Dr. Smith", service: "Annual Physical", amount: "$150.00", status: "Processed", paidAmount: "$150.00", responsibility: "$0.00" },
    { date: "2023-08-22", provider: "City Pharmacy", service: "Prescription", amount: "$85.50", status: "Processed", paidAmount: "$55.50", responsibility: "$30.00" },
    { date: "2023-07-30", provider: "Urgent Care Center", service: "Urgent Care Visit", amount: "$175.00", status: "Processed", paidAmount: "$100.00", responsibility: "$75.00" },
    { date: "2023-06-15", provider: "Lab Services Inc.", service: "Blood Work", amount: "$220.00", status: "Processed", paidAmount: "$220.00", responsibility: "$0.00" },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : ''}`}>Health Insurance</h1>
          <p className="text-muted-foreground">Manage your insurance details and claims</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-health-primary hover:bg-health-secondary">
            <Plus className="mr-2 h-4 w-4" />
            Add Insurance
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            View ID Card
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Insurance Details</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'}`}>
                  <Building className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <CardTitle className={`${theme === 'dark' ? 'text-white' : ''}`}>{insuranceInfo.provider}</CardTitle>
                  <CardDescription>{insuranceInfo.planName}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="space-y-4">
                  <div>
                    <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Policy Information</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Policy Number:</span>
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{insuranceInfo.policyNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Group Number:</span>
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{insuranceInfo.groupNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Member ID:</span>
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{insuranceInfo.memberId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Coverage Type:</span>
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{insuranceInfo.coverageType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Effective Date:</span>
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{insuranceInfo.effectiveDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Primary Insured:</span>
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{insuranceInfo.primaryInsured}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Contact Information</h3>
                    <div className="mt-2 space-y-4">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Customer Service</p>
                          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{insuranceInfo.contactPhone}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Website</p>
                          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{insuranceInfo.contactWebsite}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Download Insurance Card
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Network Information</h3>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex items-start mb-4">
                    <Users className="h-5 w-5 mr-2 mt-0.5 text-health-primary" />
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>Primary Care Physician</p>
                      <p className="text-sm text-muted-foreground">{insuranceInfo.network.primaryPhysician}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : ''}`}>In-Network Hospitals</p>
                    <div className="space-y-2">
                      {insuranceInfo.network.inNetworkHospitals.map((hospital, index) => (
                        <div 
                          key={index} 
                          className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}
                        >
                          <p className="text-sm">{hospital}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="benefits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Coverage Benefits</CardTitle>
              <CardDescription>Your insurance plan benefits and coverage details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex items-center mb-4">
                    <DollarSign className={`h-5 w-5 mr-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : ''}`}>Cost Sharing</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className="text-sm text-muted-foreground">Annual Deductible</p>
                      <p className={`text-sm font-medium mt-1 ${theme === 'dark' ? 'text-white' : ''}`}>{insuranceInfo.benefits.deductible}</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className="text-sm text-muted-foreground">Out-of-Pocket Maximum</p>
                      <p className={`text-sm font-medium mt-1 ${theme === 'dark' ? 'text-white' : ''}`}>{insuranceInfo.benefits.outOfPocketMax}</p>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex items-center mb-4">
                    <Building className={`h-5 w-5 mr-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : ''}`}>Medical Services</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className="text-sm text-muted-foreground">Primary Care Visit</p>
                      <p className={`text-sm font-medium mt-1 ${theme === 'dark' ? 'text-white' : ''}`}>{insuranceInfo.benefits.primaryCare}</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className="text-sm text-muted-foreground">Specialist Visit</p>
                      <p className={`text-sm font-medium mt-1 ${theme === 'dark' ? 'text-white' : ''}`}>{insuranceInfo.benefits.specialists}</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className="text-sm text-muted-foreground">Emergency Room</p>
                      <p className={`text-sm font-medium mt-1 ${theme === 'dark' ? 'text-white' : ''}`}>{insuranceInfo.benefits.emergency}</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className="text-sm text-muted-foreground">Urgent Care</p>
                      <p className={`text-sm font-medium mt-1 ${theme === 'dark' ? 'text-white' : ''}`}>{insuranceInfo.benefits.urgent}</p>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex items-center mb-4">
                    <CreditCard className={`h-5 w-5 mr-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : ''}`}>Prescription Coverage</h3>
                  </div>
                  
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                    <p className="text-sm text-muted-foreground">Prescription Drugs</p>
                    <p className={`text-sm font-medium mt-1 ${theme === 'dark' ? 'text-white' : ''}`}>{insuranceInfo.benefits.prescription}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Claims</CardTitle>
              <CardDescription>Your insurance claims history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClaims.map((claim, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'}`}>
                          <ClipboardCheck className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <div>
                          <p className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{claim.service}</p>
                          <p className="text-sm text-muted-foreground">{claim.provider}</p>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0">
                        <CalendarRange className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{claim.date}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Billed Amount</p>
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{claim.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Insurance Paid</p>
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{claim.paidAmount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Your Responsibility</p>
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{claim.responsibility}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className={`px-2 py-1 text-xs rounded ${
                          claim.status === "Processed" 
                            ? theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                            : theme === 'dark' ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {claim.status}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthInsurance;
