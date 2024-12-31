import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CertificateDownloadButton from "@/components/CertificateDownloadButton";

interface CertificateInfo {
  fsicNumber: string;
  establishmentName: string;
  owner: string;
  address: string;
  purpose: string;
  certificateType: string;
  amountPaid: string;
  orNumber: string;
  chiefFSES: string;
  fireMarshal: string;
}

interface CertificateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CertificateInfo) => void;
  defaultValues?: Partial<CertificateInfo>;
  establishmentInfo: {
    fsicNumber: number;
    establishmentName: string;
    owner: string;
    address: string;
  };
}

export function CertificateDialog({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  establishmentInfo,
}: CertificateDialogProps) {
  const [formData, setFormData] = useState<CertificateInfo>({
    fsicNumber: `R ${String(establishmentInfo.fsicNumber).padStart(
      2,
      "0"
    )}-${new Date().getFullYear().toString().slice(2)}`,
    establishmentName: establishmentInfo.establishmentName,
    owner: establishmentInfo.owner,
    address: establishmentInfo.address,
    purpose: defaultValues?.purpose || "",
    certificateType: defaultValues?.certificateType || "",
    amountPaid: defaultValues?.amountPaid || "",
    orNumber: defaultValues?.orNumber || "",
    chiefFSES: defaultValues?.chiefFSES || "",
    fireMarshal: defaultValues?.fireMarshal || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleGenerate = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    URL.revokeObjectURL(url);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-200 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-slate-950">
            Certificate Information
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 text-slate-950">
          <div className="space-y-2">
            <Label htmlFor="certificateType">Certificate Type</Label>
            <Input
              id="certificateType"
              value={formData.certificateType}
              className="border-slate-950"
              onChange={(e) =>
                setFormData({ ...formData, certificateType: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amountPaid">Amount Paid</Label>
            <Input
              id="amountPaid"
              value={formData.amountPaid}
              className="border-slate-950"
              onChange={(e) =>
                setFormData({ ...formData, amountPaid: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="orNumber">OR Number</Label>
            <Input
              id="orNumber"
              value={formData.orNumber}
              className="border-slate-950"
              onChange={(e) =>
                setFormData({ ...formData, orNumber: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="chiefFSES">Chief FSES</Label>
            <Input
              id="chiefFSES"
              value={formData.chiefFSES}
              className="border-slate-950"
              onChange={(e) =>
                setFormData({ ...formData, chiefFSES: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fireMarshal">Fire Marshal</Label>
            <Input
              id="fireMarshal"
              value={formData.fireMarshal}
              className="border-slate-950"
              onChange={(e) =>
                setFormData({ ...formData, fireMarshal: e.target.value })
              }
            />
          </div>
        </form>
        <DialogFooter>
          <Button
            className="border-black bg-white text-black hover:bg-slate-200"
            onClick={onClose}
          >
            Cancel
          </Button>
          <CertificateDownloadButton
            info={formData}
            onGenerate={handleGenerate}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
