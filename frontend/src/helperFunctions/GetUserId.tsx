import { useUser } from "@clerk/clerk-react";

export default function GetUserId() {
  const { user } = useUser();
  const userId: string | undefined = user?.id;
  return userId;
}
