"use client";
import { Size } from "@prisma/client";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AlertModal from "@/components/modals/allert-modal";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";

interface SizeFormProps {
  initialData: Size | null;
}
const formSchema = z.object({
  name: z.string(),
  value: z.string(),
});
type SizeFormValues = z.infer<typeof formSchema>;

const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const origin = useOrigin();
  const [isOpen, setIsOpen] = useState(false);
  const { storeId, sizeId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });
  const title = initialData ? "Edit size" : "Create size";
  const description = initialData ? "Edit size" : "Add a new size";
  const toastMessage = initialData ? "Size updated" : "Size created";
  const action = initialData ? "Save changes" : "Create";

  const router = useRouter();
  const onSubmit = async (values: SizeFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(`/api/${storeId}/sizes/${sizeId}`, values);
      } else {
        await axios.post(`/api/${storeId}/sizes`, values);
        form.reset();
      }

      toast.success(toastMessage);
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
      await axios.delete(`/api/${storeId}/sizes/${sizeId}`);
      form.reset();
      toast.success("Deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Existing sizes are left.");
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
        <Heading title={title} description={description} />
        {initialData && (
          <Button onClick={() => setIsOpen(true)} variant={"destructive"}>
            <Trash2 />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="flex flex-col mt-5 "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Size value"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />{" "}
          </div>
          <Button
            disabled={isLoading}
            className="self-start mt-5"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
      {/* <ApiAlert title="TTT" description={`${origin}/api/${storeId}`} /> */}
    </>
  );
};

export default SizeForm;
