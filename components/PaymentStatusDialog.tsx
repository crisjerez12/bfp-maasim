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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { updatePaymentStatus } from "@/app/actions/establishment-actions";

type FormData = {
  dueDate: {
    month: string;
    day: string;
  };
  inspectionDate: Date | undefined;
  establishmentStatus: string;
};

export function PaymentStatusDialog({
  id,
  onStatusUpdate,
}: {
  id: string;
  onStatusUpdate: (data: FormData & { id: string }) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      dueDate: {
        month: "",
        day: "",
      },
      inspectionDate: undefined,
      establishmentStatus: "",
    },
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  const onSubmit = async (data: FormData) => {
    const submissionData = {
      id,
      ...data,
    };
    await updatePaymentStatus(id, submissionData);
    onStatusUpdate(submissionData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-black hover:bg-slate-300">
          Update Payment Status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white text-gray-950">
        <DialogHeader>
          <DialogTitle>Update Payment Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">Due Date:</label>
            <div className="col-span-3 flex gap-2">
              <Controller
                name="dueDate.month"
                control={control}
                rules={{ required: "Month is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <Controller
                name="dueDate.day"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="status" className="text-right">
              Status:
            </label>
            <Controller
              name="establishmentStatus"
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {errors.establishmentStatus && (
            <p className="text-red-500 text-sm">
              {errors.establishmentStatus.message}
            </p>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="inspectionDate" className="text-right">
              Inspection Date:
            </label>
            <div className="col-span-3">
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
