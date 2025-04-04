import NotificationList from "@/components/notifications/NotificationList";
import React, { JSX } from "react";

const Notification = (): JSX.Element => {
  return (
    <div className="min-h-screen min-w-screen grid place-items-center">
      <NotificationList />
    </div>
  );
};

export default Notification;
