"use client";
import { Billboard, Order, Store } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AlertModal from "@/components/modals/allert-modal";
import ApiAlert from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";
import { useParams } from "next/navigation";

interface OrderFormProps {
  initialData: Order | null;

}
const formSchema = z.object({
  name: z.string(),
});
type OrderFormValues = z.infer<typeof formSchema>;

const OrderForm: React.FC<OrderFormProps> = ({
  initialData,
}) => {
  const origin = useOrigin();
  const [isOpen, setIsOpen] = useState(false);
  const { storeId, orderId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",

    },
  });
  const title = initialData ? "Edit order" : "Create order";
  const description = initialData ? "Edit order" : "Add a new order";
  const toastMessage = initialData ? "Order updated" : "Order created";
  const action = initialData ? "Save changes" : "Create";

  const router = useRouter();
  const onSubmit = async (values: OrderFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(`/api/${storeId}/orders/${orderId}`, values);
      } else {
        await axios.post(`/api/${storeId}/orders`, values);
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
      await axios.delete(`/api/${storeId}/orders/${orderId}`);  form.reset()
      toast.success("Deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Existing orders are left.");
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
                      placeholder="Order name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <FormMessage />

                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder="Select a billboard"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                   
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default OrderForm;
