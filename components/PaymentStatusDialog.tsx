"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Calendar } from "@/components/ui/calendar";
import { setInspectionDate } from "@/app/actions/establishment-actions";
import { toast } from "@/hooks/use-toast";

type FormData = {
  inspectionDate: Date | undefined;
};

export function PaymentStatusDialog({
  id,
  onStatusUpdate,
}: {
  id: string;
  onStatusUpdate: (data: FormData & { id: string }) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      inspectionDate: undefined,
    },
  });
  const onSubmit = async (data: FormData) => {
    console.log(data);
    const submissionData = {
      inspectionDate: data.inspectionDate,
    };
    const res = await setInspectionDate(id, submissionData);
    console.log(res);
    if (!res.success) {
      toast({
        title: "Unsuccessful",
        variant: "destructive",
        description: "Failed to set Inspection date",
      });
      return;
    }
    toast({
      title: "Success",
      variant: "success",
      description: "Successfully set the Inspection Date",
    });
    const statusType = { id, ...submissionData };
    onStatusUpdate(statusType);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-black hover:bg-slate-300">
          Set Inspection Date
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[325px] bg-white text-gray-950">
        <DialogHeader>
          <DialogTitle>Set Inspection Date</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <Controller
                name="inspectionDate"
                control={control}
                render={({ field }) => (
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                )}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
