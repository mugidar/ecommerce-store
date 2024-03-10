"use client";
import { Billboard, Store } from "@prisma/client";
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
import ApiAlert from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";
import { useParams } from "next/navigation";
interface BillboardFormProps {
  initialData: Billboard | null;
  
}
const formSchema = z.object({
  label: z.string(),
  imgUrl: z.string(),
});
type BillboardFormValues = z.infer<typeof formSchema>;

const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
  const origin = useOrigin();
  const [isOpen, setIsOpen] = useState(false);
  const { storeId, billboardId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imgUrl: "",
    },
  });
  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit billboard" : "Add a new billboard";
  const toastMessage = initialData ? "Billboard updated" : "Billboard created";
  const action = initialData ? "Save changes" : "Create";

  const router = useRouter();
  const onSubmit = async (values: BillboardFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(`/api/${storeId}/billboards/${billboardId}`, values);
      } else {
        await axios.post(`/api/${storeId}/billboards`, values);     form.reset()
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
      await axios.delete(`/api/${storeId}/billboards/${billboardId}`);
      toast.success("Deleted.");
      form.reset()
      router.refresh();
    } catch (error) {
      toast.error("Existing categories are left.");
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
          <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={(url: string) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    value={field.value ? [field.value] : []}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Billboard label"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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

export default BillboardForm;
