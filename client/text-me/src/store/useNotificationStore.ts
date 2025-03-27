import { NotificationType } from "@/types";
import { create } from "zustand";

interface NotificationState {
  notifications: NotificationType[];
  addNewNotification: (notification: NotificationType) => void;
}
export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNewNotification(notification) {
    set((state) => ({ notifications: [...state.notifications, notification] }));
  },
}));
