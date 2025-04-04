import Setting from "@/components/settings/Setting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserName from "@/components/Users/UserName";
import { JSX } from "react";

const AccountSetting = (): JSX.Element => {
  return (
    <Card className="my-5 min-h-screen min-w-screen">
      <CardHeader>
        <CardTitle className="flex justify-center">
          <h3 className="flex">
            Setting For&nbsp;
            <UserName />
          </h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Setting />
      </CardContent>
    </Card>
  );
};

export default AccountSetting;
