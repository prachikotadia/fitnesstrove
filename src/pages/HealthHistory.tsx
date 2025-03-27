import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Activity, Calendar, FileText, Plus, Download } from "lucide-react";
import * as RechartsPrimitive from "recharts";

const HealthHistory = () => {
  const { theme } = useTheme();
  
  // Sample data
  const healthRecords = [
    { date: "2023-10-15", type: "Check-up", provider: "Dr. Smith", notes: "Annual physical examination. All vitals normal." },
    { date: "2023-08-22", type: "Specialist", provider: "Dr. Johnson", notes: "Cardiology consultation. ECG shows normal sinus rhythm." },
    { date: "2023-06-10", type: "Laboratory", provider: "City Lab", notes: "Complete blood count and lipid panel. Cholesterol slightly elevated." },
    { date: "2023-04-05", type: "Imaging", provider: "Medical Imaging Center", notes: "Chest X-ray for persistent cough. Results clear." },
    { date: "2023-02-18", type: "Emergency", provider: "General Hospital", notes: "Treatment for minor ankle sprain. RICE protocol recommended." },
  ];

  // Chart data
  const weightData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Weight (kg)",
        data: [78, 79, 78.5, 77, 76.5, 75, 74.5, 74, 73.5, 73],
        fill: false,
        borderColor: theme === 'dark' ? "#7DD3FC" : "#0EA5E9",
        tension: 0.1,
      },
    ],
  };

  const bloodPressureData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Systolic",
        data: [130, 128, 132, 129, 125, 122, 120, 118, 117, 115],
        borderColor: theme === 'dark' ? "#F87171" : "#EF4444",
        tension: 0.1,
      },
      {
        label: "Diastolic",
        data: [85, 84, 86, 84, 82, 80, 79, 78, 77, 76],
        borderColor: theme === 'dark' ? "#60A5FA" : "#3B82F6",
        tension: 0.1,
      },
    ],
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : ''}`}>Health History</h1>
          <p className="text-muted-foreground">Track your medical history and health metrics over time</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-health-primary hover:bg-health-secondary">
            <Plus className="mr-2 h-4 w-4" />
            Add Record
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="records" className="space-y-4">
        <TabsList>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
              <CardDescription>Recent medical visits and consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthRecords.map((record, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'}`}>
                          <Activity className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <div>
                          <p className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{record.type}</p>
                          <p className="text-sm text-muted-foreground">{record.provider}</p>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{record.date}</span>
                      </div>
                    </div>
                    <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {record.notes}
                    </p>
                    <div className="mt-3">
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
        
        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Weight Tracking</CardTitle>
                <CardDescription>Your weight over the last 10 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={{}}>
                    <RechartsPrimitive.LineChart data={weightData.datasets[0].data.map((value, index) => ({ name: weightData.labels[index], value }))}>
                      <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                      <RechartsPrimitive.XAxis dataKey="name" />
                      <RechartsPrimitive.YAxis />
                      <RechartsPrimitive.Tooltip />
                      <RechartsPrimitive.Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke={theme === 'dark' ? "#7DD3FC" : "#0EA5E9"} 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                    </RechartsPrimitive.LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Blood Pressure</CardTitle>
                <CardDescription>Your blood pressure readings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={{}}>
                    <RechartsPrimitive.LineChart 
                      data={bloodPressureData.labels.map((label, index) => ({
                        name: label,
                        systolic: bloodPressureData.datasets[0].data[index],
                        diastolic: bloodPressureData.datasets[1].data[index]
                      }))}
                    >
                      <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                      <RechartsPrimitive.XAxis dataKey="name" />
                      <RechartsPrimitive.YAxis />
                      <RechartsPrimitive.Tooltip />
                      <RechartsPrimitive.Legend />
                      <RechartsPrimitive.Line 
                        type="monotone" 
                        dataKey="systolic" 
                        stroke={theme === 'dark' ? "#F87171" : "#EF4444"} 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                      <RechartsPrimitive.Line 
                        type="monotone" 
                        dataKey="diastolic" 
                        stroke={theme === 'dark' ? "#60A5FA" : "#3B82F6"} 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                    </RechartsPrimitive.LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical Documents</CardTitle>
              <CardDescription>Upload and access your medical documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`p-8 border-2 border-dashed rounded-lg text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                <div className="flex flex-col items-center">
                  <FileText className={`h-12 w-12 mb-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                  <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : ''}`}>
                    Upload Medical Documents
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop files here, or click to select files
                  </p>
                  <Button size="sm">Select Files</Button>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>Recent Documents</h3>
                <div className="space-y-3">
                  <p className="text-muted-foreground text-center py-4">
                    No documents uploaded yet
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthHistory;
