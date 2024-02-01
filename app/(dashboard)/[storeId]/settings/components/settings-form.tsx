"use client";
import { Store } from "@prisma/client";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AlertModal from "@/components/modals/allert-modal";
import ApiAlert from "@/components/ui/api-alert";
interface SettingsFormProps {
  initialData: Store;
  storeId: string;
}
const formSchema = z.object({
  name: z.string().min(4),
});
type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData,
  storeId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const router = useRouter();
  const onSubmit = async (values: SettingsFormValues) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/stores/${storeId}`, values);
      toast.success("Saved.");
      router.refresh();
    } catch (error) {
      toast.error("Error.");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/stores/${storeId}`);
      toast.success("Deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Existing products and categories left.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onConfirm={onDelete}
        onClose={() => setIsOpen(false)}
        isLoading={isLoading}
      />
      <div className="flex justify-between items-center">
        <Heading title="Store" description="Manage store" />
        <Button onClick={() => setIsOpen(true)} variant={"destructive"}>
          <Trash2 />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form className="flex flex-col " onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Your store name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="self-start" type="submit">
            Save
          </Button>
        </form>
      </Form>
      <ApiAlert title="TTT" description="deradfaf" />
    </>
  );
};

export default SettingsForm;
