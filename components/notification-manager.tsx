"use client";

import { useState, useEffect } from "react";
import { Bell, BellOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { Task } from "@/components/daily-planner";
import { type TranslationKey, getTranslation } from "@/lib/translations";

interface NotificationManagerProps {
  tasks: Task[];
  language: string;
}

export function NotificationManager({ tasks, language }: NotificationManagerProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | "default">("default");
  const [isClient, setIsClient] = useState(false);  // To ensure we're on the client side
  const { toast } = useToast();
  const t = (key: TranslationKey) => getTranslation(language, key);

  useEffect(() => {
    setIsClient(true); // Set this to true once the component has mounted on the client
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Check if notifications are supported
    if (!("Notification" in window)) {
      return;
    }

    // Get current permission state
    setPermission(Notification.permission);

    const savedPreference = localStorage.getItem("notificationsEnabled");
    if (savedPreference === "true" && Notification.permission === "granted") {
      setNotificationsEnabled(true);
    }
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    localStorage.setItem("notificationsEnabled", notificationsEnabled.toString());

    let notificationInterval: NodeJS.Timeout | null = null;
    if (notificationsEnabled && permission === "granted") {
      notificationInterval = setInterval(() => {
        checkForUpcomingTasks();
      }, 60000); // Check every minute
    }

    return () => {
      if (notificationInterval) {
        clearInterval(notificationInterval);
      }
    };
  }, [notificationsEnabled, permission, tasks, isClient]);

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      toast({
        title: "Notifications Not Supported",
        description: "Your browser does not support notifications.",
        variant: "destructive",
      });
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);

      if (permission === "granted") {
        setNotificationsEnabled(true);
        toast({
          title: t("enableNotifications"),
          description: "You will now receive notifications for upcoming tasks.",
        });
      } else {
        toast({
          title: "Permission Denied",
          description: "You have denied notification permissions.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      toast({
        title: "Error",
        description: "There was an error requesting notification permissions.",
        variant: "destructive",
      });
    }
  };

  const toggleNotifications = (enabled: boolean) => {
    if (enabled && permission !== "granted") {
      requestPermission();
    } else {
      setNotificationsEnabled(enabled);
      toast({
        title: enabled ? t("enableNotifications") : t("disableNotifications"),
        description: enabled
          ? "You will now receive notifications for upcoming tasks."
          : "You will no longer receive notifications for upcoming tasks.",
      });
    }
  };

  const checkForUpcomingTasks = () => {
    const now = new Date();
    const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60000);

    tasks.forEach((task) => {
      if (task.completed) return;

      const taskDate = new Date(task.date);

      if (task.time) {
        const [hours, minutes] = task.time.split(":").map(Number);
        taskDate.setHours(hours, minutes);

        if (taskDate > now && taskDate <= fiveMinutesFromNow) {
          showNotification(task);
        }
      }
    });
  };

  const showNotification = (task: Task) => {
    if (!("Notification" in window) || Notification.permission !== "granted") {
      return;
    }

    const notification = new Notification(t("taskTitle") + ": " + task.title, {
      body: `${t("due")}: ${task.time} - ${t("priority")}: ${task.priority}`,
      icon: "/favicon.ico",
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  };

  if (!isClient) return null; // Don't render until the client-side is ready

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="notifications"
        checked={notificationsEnabled}
        onCheckedChange={toggleNotifications}
        disabled={typeof window === "undefined" || !("Notification" in window)}
      />
      <Label htmlFor="notifications" className="flex items-center gap-1">
        {notificationsEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
        <span className="hidden md:inline">
          {notificationsEnabled ? t("enableNotifications") : t("disableNotifications")}
        </span>
      </Label>
    </div>
  );
}
