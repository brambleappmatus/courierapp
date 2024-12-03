"use client";

import { Courier } from "@/lib/data/types/courier";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingDown, TrendingUp, Clock, Package2, Users, Star } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface BusinessInsightsProps {
  couriers: Courier[];
}

export function BusinessInsights({ couriers }: BusinessInsightsProps) {
  const activeCouriers = couriers.filter(c => c.status === "active");
  const currentYear = new Date().getFullYear();
  
  // Calculate key metrics
  const avgOnTimeRate = activeCouriers.reduce((sum, c) => sum + c.metrics.onTimeRate, 0) / activeCouriers.length;
  const avgSuccessRate = activeCouriers.reduce((sum, c) => sum + c.metrics.successRate, 0) / activeCouriers.length;
  const avgPackageAccuracy = activeCouriers.reduce((sum, c) => sum + c.metrics.packageAccuracy, 0) / activeCouriers.length;
  
  const lowPerformers = activeCouriers.filter(c => c.metrics.onTimeRate < avgOnTimeRate);
  const highPerformers = activeCouriers.filter(c => c.metrics.successRate > 98);
  
  const yearlyDeliveries = activeCouriers.reduce((sum, c) => {
    return sum + c.monthlyStats
      .filter(stat => stat.year === currentYear)
      .reduce((total, stat) => total + stat.deliveries, 0);
  }, 0);

  const lastYearDeliveries = activeCouriers.reduce((sum, c) => {
    return sum + c.monthlyStats
      .filter(stat => stat.year === currentYear - 1)
      .reduce((total, stat) => total + stat.deliveries, 0);
  }, 0);

  const deliveryGrowth = ((yearlyDeliveries - lastYearDeliveries) / lastYearDeliveries) * 100;

  const insights = [
    {
      title: "Critical Action Required",
      items: [
        {
          title: "On-Time Delivery Optimization",
          description: `${lowPerformers.length} couriers (${((lowPerformers.length / activeCouriers.length) * 100).toFixed(1)}%) are performing below the average on-time rate of ${avgOnTimeRate.toFixed(1)}%. Immediate intervention required.`,
          icon: Clock,
          color: "text-red-500",
          priority: "Critical",
        },
        {
          title: "Package Handling Accuracy",
          description: `Current package accuracy rate is ${avgPackageAccuracy.toFixed(1)}%. Implement immediate quality control measures to reduce errors and damage.`,
          icon: Package2,
          color: "text-red-500",
          priority: "Critical",
        }
      ]
    },
    {
      title: "Growth Opportunities",
      items: [
        {
          title: "Delivery Volume Growth",
          description: `${deliveryGrowth > 0 ? "+" : ""}${deliveryGrowth.toFixed(1)}% delivery volume ${deliveryGrowth > 0 ? "increase" : "decrease"} compared to last year. ${deliveryGrowth < 10 ? "Consider expanding delivery capacity." : "Strong growth trajectory."}`,
          icon: TrendingUp,
          color: deliveryGrowth > 0 ? "text-green-500" : "text-yellow-500",
          priority: "High",
        },
        {
          title: "High Performer Analysis",
          description: `${highPerformers.length} couriers consistently achieve >98% success rate. Analyze their practices for team-wide implementation.`,
          icon: Star,
          color: "text-blue-500",
          priority: "High",
        }
      ]
    },
    {
      title: "Operational Improvements",
      items: [
        {
          title: "Workforce Optimization",
          description: `${activeCouriers.length} active couriers with ${avgSuccessRate.toFixed(1)}% average success rate. Consider performance-based scheduling.`,
          icon: Users,
          color: "text-purple-500",
          priority: "Medium",
        },
        {
          title: "Performance Monitoring",
          description: "Implement daily performance tracking and real-time feedback systems for continuous improvement.",
          icon: AlertTriangle,
          color: "text-orange-500",
          priority: "Medium",
        }
      ]
    }
  ];

  const recommendations = [
    {
      category: "Immediate Actions",
      items: [
        "Implement automated route optimization for low-performing couriers",
        "Establish a quality control checkpoint system for package handling",
        "Launch a performance improvement program for below-average couriers"
      ]
    },
    {
      category: "Short-term Improvements",
      items: [
        "Develop a mentorship program pairing high and low performers",
        "Implement real-time delivery status updates and tracking",
        "Create a reward system for consistent high performers"
      ]
    },
    {
      category: "Long-term Strategy",
      items: [
        "Invest in predictive analytics for delivery optimization",
        "Develop a comprehensive courier training program",
        "Establish partnerships for delivery volume growth"
      ]
    }
  ];

  return (
    <Card className="card-3d">
      <CardHeader>
        <CardTitle>Business Insights & Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6">
          {insights.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border bg-card">
                    <div className={`${insight.color} p-2 rounded-full bg-background shrink-0`}>
                      <insight.icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{insight.title}</p>
                        <Badge variant={insight.priority === "Critical" ? "destructive" : "secondary"}>
                          {insight.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Action Plan</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {recommendations.map((section, index) => (
              <div key={index} className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">
                  {section.category}
                </h4>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}