
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Activity, Heart, Droplets, DumbbellIcon, Utensils, 
  BedIcon, ArrowUp, Check, Plus
} from "lucide-react";
import HealthChat from "@/components/health/HealthChat";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [showChat, setShowChat] = useState(false);

  // Sample data for demonstration
  const healthMetrics = {
    steps: 7854,
    stepsGoal: 10000,
    calories: 1850,
    caloriesGoal: 2200,
    water: 5,
    waterGoal: 8,
    sleep: 7.2,
    sleepGoal: 8,
    heartRate: 72,
    workouts: 2,
    workoutsGoal: 5
  };

  const recentActivities = [
    { id: 1, type: "workout", name: "Morning Run", time: "7:30 AM", duration: "30 min", calories: 320 },
    { id: 2, type: "meal", name: "Breakfast", time: "8:15 AM", calories: 420 },
    { id: 3, type: "water", amount: "500ml", time: "9:30 AM" },
    { id: 4, type: "workout", name: "Strength Training", time: "6:00 PM", duration: "45 min", calories: 280 },
    { id: 5, type: "meal", name: "Dinner", time: "7:30 PM", calories: 650 }
  ];

  const renderActivityIcon = (type: string) => {
    switch (type) {
      case "workout":
        return <DumbbellIcon className="h-5 w-5 text-health-primary" />;
      case "meal":
        return <Utensils className="h-5 w-5 text-health-green" />;
      case "water":
        return <Droplets className="h-5 w-5 text-health-accent" />;
      default:
        return <Activity className="h-5 w-5 text-health-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {currentUser?.name?.split(' ')[0]}</h1>
          <p className="text-muted-foreground">Here's an overview of your health today.</p>
        </div>
        <Button 
          className="bg-health-primary hover:bg-health-secondary"
          onClick={() => setShowChat(true)}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Ask Health Assistant
        </Button>
      </div>

      {/* Health Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-blue-100 p-2">
                  <Activity className="h-5 w-5 text-health-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{healthMetrics.steps.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">/{healthMetrics.stepsGoal.toLocaleString()} steps</div>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full border-4 border-gray-100 flex items-center justify-center">
                <span className="text-sm font-medium">
                  {Math.round((healthMetrics.steps / healthMetrics.stepsGoal) * 100)}%
                </span>
              </div>
            </div>
            <Progress 
              value={(healthMetrics.steps / healthMetrics.stepsGoal) * 100} 
              className="h-2 mt-3" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Heart Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-red-100 p-2">
                <Heart className="h-5 w-5 text-health-red" />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">{healthMetrics.heartRate}</span>
                  <span className="ml-1 text-lg">bpm</span>
                </div>
                <div className="flex items-center text-sm text-health-green">
                  <Check className="h-4 w-4 mr-1" />
                  Normal range
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <div>Resting: 65 bpm</div>
              <div>Peak today: 142 bpm</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Water Intake</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-blue-100 p-2">
                  <Droplets className="h-5 w-5 text-health-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{healthMetrics.water}</div>
                  <div className="text-xs text-muted-foreground">/{healthMetrics.waterGoal} glasses</div>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Progress 
              value={(healthMetrics.water / healthMetrics.waterGoal) * 100} 
              className="h-2 mt-3" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sleep</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-purple-100 p-2">
                <BedIcon className="h-5 w-5 text-health-purple" />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">{healthMetrics.sleep}</span>
                  <span className="ml-1 text-lg">hrs</span>
                </div>
                <div className="text-xs text-muted-foreground">Goal: {healthMetrics.sleepGoal} hours</div>
              </div>
            </div>
            <Progress 
              value={(healthMetrics.sleep / healthMetrics.sleepGoal) * 100} 
              className="h-2 mt-3" 
            />
          </CardContent>
        </Card>
      </div>

      {/* Health Dashboard Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Health Overview</CardTitle>
              <CardDescription>Your current health metrics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="activity">
                <TabsList className="mb-4">
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                  <TabsTrigger value="sleep">Sleep</TabsTrigger>
                </TabsList>
                <TabsContent value="activity" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Today's Steps</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{healthMetrics.steps.toLocaleString()}</div>
                        <div className="text-sm text-health-green flex items-center mt-1">
                          <ArrowUp className="h-4 w-4 mr-1" />
                          12% more than yesterday
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Workouts This Week</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{healthMetrics.workouts}/{healthMetrics.workoutsGoal}</div>
                        <Progress 
                          value={(healthMetrics.workouts / healthMetrics.workoutsGoal) * 100} 
                          className="h-2 mt-3" 
                        />
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardContent className="py-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Calories Burned Today</p>
                        <p className="text-3xl font-bold">856 kcal</p>
                      </div>
                      {/* This would be a chart in a real app */}
                      <div className="h-36 mt-4 bg-gray-100 rounded-md flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">
                          Activity chart visualization would go here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="nutrition" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Calories Consumed</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{healthMetrics.calories}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Target: {healthMetrics.caloriesGoal} kcal
                        </div>
                        <Progress 
                          value={(healthMetrics.calories / healthMetrics.caloriesGoal) * 100} 
                          className="h-2 mt-3" 
                        />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Protein Intake</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">78g</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Target: 120g
                        </div>
                        <Progress 
                          value={(78 / 120) * 100} 
                          className="h-2 mt-3" 
                        />
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardContent className="py-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Nutrition Breakdown</p>
                      </div>
                      {/* This would be a chart in a real app */}
                      <div className="h-36 mt-4 bg-gray-100 rounded-md flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">
                          Nutrition breakdown chart would go here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="sleep" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Sleep Duration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{healthMetrics.sleep} hrs</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Target: {healthMetrics.sleepGoal} hours
                        </div>
                        <Progress 
                          value={(healthMetrics.sleep / healthMetrics.sleepGoal) * 100} 
                          className="h-2 mt-3" 
                        />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">Good</div>
                        <div className="text-xs text-health-green flex items-center mt-1">
                          <ArrowUp className="h-4 w-4 mr-1" />
                          Better than last week
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardContent className="py-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Sleep Patterns</p>
                      </div>
                      {/* This would be a chart in a real app */}
                      <div className="h-36 mt-4 bg-gray-100 rounded-md flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">
                          Sleep pattern chart would go here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>AI Health Insights</CardTitle>
              <CardDescription>Personalized insights based on your health data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 rounded-full bg-health-primary p-1">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-health-primary">Activity Pattern</h4>
                    <p className="text-sm mt-1">
                      You're most active in the mornings. Consider adding an evening walk to boost your daily step count and improve your overall activity level.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 rounded-full bg-health-green p-1">
                    <Utensils className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-health-green">Nutrition Insight</h4>
                    <p className="text-sm mt-1">
                      Your protein intake is below your daily target. Try adding more lean protein sources like chicken, fish, or plant-based alternatives to your meals.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 rounded-full bg-health-purple p-1">
                    <BedIcon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-health-purple">Sleep Recommendation</h4>
                    <p className="text-sm mt-1">
                      You've been consistently getting less sleep than recommended. Try going to bed 30 minutes earlier to reach your 8-hour sleep goal.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Activity</CardTitle>
              <CardDescription>Your activity log for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start pb-4 last:pb-0 border-b last:border-0 border-gray-100">
                    <div className="mr-3 mt-1 rounded-full bg-gray-100 p-2">
                      {renderActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{activity.name}</h4>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {activity.type === "workout" && (
                          <>Duration: {activity.duration} • {activity.calories} kcal</>
                        )}
                        {activity.type === "meal" && (
                          <>{activity.calories} kcal</>
                        )}
                        {activity.type === "water" && (
                          <>{activity.amount} of water</>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">View All Activity</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Goals</CardTitle>
              <CardDescription>Your health goals for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">10,000 daily steps</div>
                    <div className="text-sm text-muted-foreground">4/7 days</div>
                  </div>
                  <Progress value={57} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">5 workouts this week</div>
                    <div className="text-sm text-muted-foreground">2/5 completed</div>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">8 hours of sleep</div>
                    <div className="text-sm text-muted-foreground">2/7 days</div>
                  </div>
                  <Progress value={29} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">2L water daily</div>
                    <div className="text-sm text-muted-foreground">5/7 days</div>
                  </div>
                  <Progress value={71} className="h-2" />
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">Set New Goal</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Health Chat Assistant */}
      {showChat && <HealthChat onClose={() => setShowChat(false)} />}
    </div>
  );
};

// Added import at the top
import { MessageSquare } from "lucide-react";

export default Dashboard;
