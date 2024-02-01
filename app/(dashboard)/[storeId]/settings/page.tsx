import Heading from "@/components/ui/heading";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import SettingsForm from "./components/settings-form";

const Settings = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");
  const storeId = params.storeId;
  const store = await prismadb.store.findFirst({
    where: {
      userId,
      id: storeId,
    },
  });

  if (!store) {
    redirect("/");
  }
  return (
    <div>
      <SettingsForm initialData={store}  storeId={storeId}/>
    </div>
  );
};

export default Settings;
