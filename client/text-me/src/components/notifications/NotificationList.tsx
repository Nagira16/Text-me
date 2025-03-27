"use client";

import { useNotificationStore } from "@/store/useNotificationStore";
import Image from "next/image";
import { JSX } from "react";

const NotificationList = (): JSX.Element => {
  const notifications = useNotificationStore((state) => state.notifications);

  return (
    <div className="p-6 min-w-screen ml-16">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-lg text-gray-500">No new notifications</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={`${notification.username}-${notification.type}`}
              className=" p-4 rounded-lg shadow-md hover:bg-gray-500 transition w-full"
            >
              <div className="flex items-center">
                {notification.type === "Comment" && (
                  <>
                    <Image
                      src={notification.post.photo}
                      alt="Post"
                      width={50}
                      height={50}
                      className="mr-4"
                    />
                    <div className="flex flex-col">
                      <strong>{notification.username}</strong> commented:{" "}
                      <span className="italic text-gray-600">
                        {notification.comment}
                      </span>
                    </div>
                  </>
                )}
                {notification.type === "Follow" && (
                  <>
                    <strong>{notification.username}</strong>
                    &nbsp;followed&nbsp;you.
                  </>
                )}
                {notification.type === "Like" && (
                  <>
                    <Image
                      src={notification.post.photo}
                      alt="Post"
                      width={50}
                      height={50}
                      className="mr-4"
                    />
                    <div className="flex flex-col">
                      <strong>{notification.username}</strong>liked your post.
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;
