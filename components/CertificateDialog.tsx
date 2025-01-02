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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CertificateDownloadButton from "@/components/CertificateDownloadButton";
import { CertificateInfo } from "./FSICCertificate";

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
    fsicNumber: `${String(establishmentInfo.fsicNumber).padStart(
      2,
      "0"
    )}-${new Date().getFullYear().toString().slice(2)}`,
    establishmentName: establishmentInfo.establishmentName.toUpperCase(),
    owner: establishmentInfo.owner.toUpperCase(),
    address: establishmentInfo.address.toUpperCase(),
    purpose: (
      defaultValues?.purpose || "FOR CERTIFICATE OF OCCUPANCY"
    ).toUpperCase(),
    otherPurpose: (defaultValues?.otherPurpose || "").toUpperCase(),
    certificateType: (defaultValues?.certificateType || "").toUpperCase(),
    amountPaid: (defaultValues?.amountPaid || "").toUpperCase(),
    orNumber: (defaultValues?.orNumber || "").toUpperCase(),
    chiefFSES: (defaultValues?.chiefFSES || "").toUpperCase(),
    fireMarshal: (defaultValues?.fireMarshal || "").toUpperCase(),
    description: (defaultValues?.description || "").toUpperCase(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-200 sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-slate-950">
            Certificate Information
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 text-slate-950">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Select
                value={formData.purpose}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    purpose: value.toUpperCase(),
                    otherPurpose:
                      value !== "OTHERS" ? "" : formData.otherPurpose,
                  })
                }
              >
                <SelectTrigger className="border-slate-950">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FOR CERTIFICATE OF OCCUPANCY">
                    FOR CERTIFICATE OF OCCUPANCY
                  </SelectItem>
                  <SelectItem value="FOR BUSINESS PERMIT (NEW/RENEWAL)">
                    FOR BUSINESS PERMIT (NEW/RENEWAL)
                  </SelectItem>
                  <SelectItem value="OTHERS">OTHERS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.purpose === "OTHERS" && (
              <div className="space-y-2">
                <Label htmlFor="otherPurpose">Specify Other Purpose</Label>
                <Input
                  id="otherPurpose"
                  value={formData.otherPurpose}
                  className="border-slate-950"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      otherPurpose: e.target.value.toUpperCase(),
                    })
                  }
                />
              </div>
            )}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={formData.description}
                className="w-full h-24 p-2 border border-slate-950 rounded-md"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="certificateType">Certificate Type</Label>
              <Input
                id="certificateType"
                value={formData.certificateType}
                className="border-slate-950"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    certificateType: e.target.value.toUpperCase(),
                  })
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
                  setFormData({
                    ...formData,
                    amountPaid: e.target.value.toUpperCase(),
                  })
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
                  setFormData({
                    ...formData,
                    orNumber: e.target.value.toUpperCase(),
                  })
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
                  setFormData({
                    ...formData,
                    chiefFSES: e.target.value.toUpperCase(),
                  })
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
                  setFormData({
                    ...formData,
                    fireMarshal: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button
            className="border-black bg-white text-black hover:bg-slate-200"
            onClick={onClose}
          >
            Cancel
          </Button>
          <CertificateDownloadButton info={formData} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
