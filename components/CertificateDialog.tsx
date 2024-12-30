import { useState } from "react";

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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-[600px]">
        <h2 className="text-xl font-bold mb-4 text-black">
          Certificate Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            id="fsicNumber"
            value={formData.fsicNumber}
            readOnly
            className="bg-gray-700 hidden"
          />
          <Input
            id="establishmentName"
            value={formData.establishmentName}
            readOnly
            className="bg-gray-700 hidden"
          />
          <Input
            id="owner"
            value={formData.owner}
            readOnly
            className="bg-gray-700 hidden"
          />
          <Input
            id="address"
            value={formData.address}
            readOnly
            className="bg-gray-700 hidden"
          />
          <div>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="certificateType">Certificate Type</Label>
                <Input
                  id="certificateType"
                  type="text"
                  value={formData.certificateType}
                  className="bg-transparent text-black"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      certificateType: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="amountPaid">Amount Paid</Label>
                <Input
                  id="amountPaid"
                  type="text"
                  value={formData.amountPaid}
                  className="bg-transparent text-black"
                  onChange={(e) =>
                    setFormData({ ...formData, amountPaid: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="orNumber">OR Number</Label>
                <Input
                  id="orNumber"
                  type="text"
                  value={formData.orNumber}
                  className="bg-transparent text-black"
                  onChange={(e) =>
                    setFormData({ ...formData, orNumber: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="chiefFSES">Chief FSES</Label>
                <Input
                  id="chiefFSES"
                  type="text"
                  value={formData.chiefFSES}
                  className="bg-transparent text-black"
                  onChange={(e) =>
                    setFormData({ ...formData, chiefFSES: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="fireMarshal">Fire Marshal</Label>
                <Input
                  id="fireMarshal"
                  type="text"
                  value={formData.fireMarshal}
                  className="bg-transparent text-black"
                  onChange={(e) =>
                    setFormData({ ...formData, fireMarshal: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Label = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) => (
  <label
    htmlFor={htmlFor}
    className="block text-gray-700 text-sm font-bold mb-2"
  >
    {children}
  </label>
);

const Input = ({
  id,
  type = "text",
  value,
  onChange,
  readOnly,
  className,
}: {
  id: string;
  type?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  className?: string;
}) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    readOnly={readOnly}
    className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);
