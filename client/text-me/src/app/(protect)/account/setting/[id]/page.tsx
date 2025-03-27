import Setting from "@/components/Setting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserName from "@/components/UserName";

const AccountSetting = () => {
  return (
    <div className="min-h-screen min-w-screen ">
      <Card className="my-5 w-full">
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
    </div>
  );
};

export default AccountSetting;
