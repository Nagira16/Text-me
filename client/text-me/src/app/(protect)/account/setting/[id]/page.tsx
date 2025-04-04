import Setting from "@/components/settings/Setting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserName from "@/components/Users/UserName";
import { JSX } from "react";

const AccountSetting = (): JSX.Element => {
  return (
    <SidebarProvider>
      <Card className="border-none min-h-screen min-w-screen">
        <SidebarTrigger />
        <CardHeader>
          <CardTitle className="flex justify-center">
            <h3 className="flex">
              Setting For&nbsp;
              <UserName />
            </h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="max-sm:p-0">
          <Setting />
        </CardContent>
      </Card>
    </SidebarProvider>
  );
};

export default AccountSetting;
