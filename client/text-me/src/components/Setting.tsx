"use client";

import { useState } from "react";
import AccountSettingList from "./AccountSettingList";

const Setting = () => {
  const [selectedList, setSelectedList] = useState<string | null>(null);
  return (
    <div className="flex h-screen w-full">
      <AccountSettingList setSelectedList={setSelectedList} />

      <main className="flex-1 flex flex-col p-4">
        {selectedList ? (
          <>{selectedList}</>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Select A Setting</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Setting;
