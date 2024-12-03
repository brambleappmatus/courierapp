"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <ScrollArea className="h-[calc(100vh-5rem)]">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        </div>

        <div className="grid gap-8">
          {/* Appearance */}
          <Card className="border bg-card">
            <div className="p-6 space-y-6">
              <h3 className="text-lg font-medium">Appearance</h3>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Theme</div>
                  <div className="text-sm text-muted-foreground">
                    Select your preferred theme
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="border bg-card">
            <div className="p-6 space-y-6">
              <h3 className="text-lg font-medium">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive push notifications for important updates
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive daily email summaries
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </Card>

          {/* Account */}
          <Card className="border bg-card">
            <div className="p-6 space-y-6">
              <h3 className="text-lg font-medium">Account</h3>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    defaultValue="alex@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    defaultValue="Alex Newman"
                  />
                </div>
                <Button>Save Changes</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}