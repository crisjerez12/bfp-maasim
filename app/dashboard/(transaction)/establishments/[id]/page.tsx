"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Download,
  Edit,
  Trash2,
  ArrowLeft,
  Info,
  Building,
  Briefcase,
  Phone,
  Archive,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { deleteEstablishment } from "@/app/actions/establishment-actions";
import Loading from "./loading";
import { PaymentStatusDialog } from "@/components/PaymentStatusDialog";
import { CertificateDialog } from "@/components/CertificateDialog";
import CertificateDownloadButton from "@/components/CertificateDownloadButton";

interface FSICData {
  _id: string;
  fsicNumber: number;
  establishmentName: string;
  owner: string;
  representativeName: string;
  tradeName: string;
  totalBuildArea: number;
  numberOfOccupants: number;
  typeOfOccupancy: string;
  typeOfBuilding: string;
  natureOfBusiness: string;
  businessIdentificationNo: string;
  taxIdentificationNo: string;
  dtiNo: string;
  secNo: string;
  isHighRise: boolean;
  isInEminentDanger: boolean;
  lastIssuanceType: string;
  barangay: string;
  address: string;
  email: string;
  landline: string;
  mobile: string;
  isActive: boolean;
  updatedAt: string;
  dueDate?: { month: string; day: string };
  establishmentStatus?: string;
}

interface CertificateFormData {
  certificateType: string;
  amountPaid: string;
  orNumber: string;
  chiefFSES: string;
  fireMarshal: string;
}

export default function FSICDetails() {
  const [fsicData, setFsicData] = useState<FSICData | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCertDialogOpen, setIsCertDialogOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fsic/${params.id}`);
        const data = await response.json();
        if (data.success) {
          setFsicData(data.data);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch FSIC data",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred while fetching data",
        });
      }
    };

    fetchData();
  }, [params.id, toast]);

  const handleDelete = async () => {
    setIsProcessing(true);
    try {
      const response = await deleteEstablishment(params.id as string);
      if (response.success) {
        toast({
          variant: "success",
          title: "Success",
          description: "Establishment deleted successfully",
        });
        router.push("/dashboard/establishments");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "An unexpected error occurred while deleting the establishment",
      });
    } finally {
      setIsProcessing(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleArchive = async () => {
    setIsProcessing(true);
    try {
      const response = await deleteEstablishment(params.id as string);
      if (response.success) {
        toast({
          variant: "success",
          title: "Success",
          description: "Establishment archived successfully",
        });
        router.push("/dashboard/establishments");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "An unexpected error occurred while archiving the establishment",
      });
    } finally {
      setIsProcessing(false);
      setIsArchiveDialogOpen(false);
    }
  };

  const handleDownload = (type: "certificate" | "receipt") => {
    // Implement download functionality
    console.log(`Downloading ${type}...`);
  };

  const handlePaymentStatusUpdate = (data: {
    id: string;
    dueDate: { month: string; day: string };
    inspectionDate: Date | undefined;
    establishmentStatus: string;
  }) => {
    console.log("Payment Status Update:", data);
    setFsicData((prevData) => ({
      ...prevData!,
      dueDate: data.dueDate,
      inspectionDate: data.inspectionDate,
      establishmentStatus: data.establishmentStatus,
    }));
  };

  const handleCertificateDownload = async (formData: CertificateFormData) => {
    try {
      const certificateInfo = {
        fsicNumber: `R ${String(fsicData?.fsicNumber).padStart(
          2,
          "0"
        )}-${new Date().getFullYear().toString().slice(2)}`,
        establishmentName: fsicData?.establishmentName || "",
        owner: fsicData?.owner || "",
        address: fsicData?.address || "",
        purpose: formData.certificateType,
        certificateType: formData.certificateType,
        amountPaid: formData.amountPaid,
        orNumber: formData.orNumber,
        chiefFSES: formData.chiefFSES,
        fireMarshal: formData.fireMarshal,
      };

      // Use CertificateDownloadButton to generate the certificate
      const onGenerate = (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `FSIC-${certificateInfo.fsicNumber}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      };

      <CertificateDownloadButton
        info={certificateInfo}
        onGenerate={onGenerate}
      />;

      setIsCertDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to generate certificate. ${
          error instanceof Error ? error.message : ""
        }`,
      });
    }
  };

  if (!fsicData) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/dashboard/establishments" passHref>
          <Button className="mb-6 bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-200">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Establishments
          </Button>
        </Link>

        <h1 className="text-3xl font-bold">FSIC Details</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2 flex-wrap">
            <PaymentStatusDialog
              id={fsicData._id}
              onStatusUpdate={handlePaymentStatusUpdate}
            />

            <Button
              onClick={() => handleDownload("receipt")}
              className="bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-200"
            >
              <Download className="mr-2 h-4 w-4" /> Receipt
            </Button>
            <Button
              onClick={() => setIsCertDialogOpen(true)} // Updated certificate button click handler
              className="bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-200"
            >
              <FileText className="mr-2 h-4 w-4" /> Certificate
            </Button>
            <Link href={`${params.id}/edit`} passHref>
              <Button className="bg-green-600 hover:bg-green-500 text-white transition-colors duration-200">
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
            </Link>
            <Dialog
              open={isArchiveDialogOpen}
              onOpenChange={setIsArchiveDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  className="bg-yellow-600 hover:bg-yellow-500 text-white transition-colors duration-200"
                >
                  <Archive className="mr-2 h-4 w-4" /> Archive
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 text-gray-100 border border-gray-600">
                <DialogHeader>
                  <DialogTitle>
                    Are you sure you want to archive this record?
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    This action will move the FSIC record to the archives. You
                    can restore it later if needed.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsArchiveDialogOpen(false)}
                    className="border-gray-600 text-gray-100 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleArchive}
                    disabled={isProcessing}
                    className="bg-yellow-600 hover:bg-yellow-500 text-white transition-colors duration-200"
                  >
                    {isProcessing ? "Archiving..." : "Archive"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-500 text-white transition-colors duration-200"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 text-gray-100 border border-gray-600">
                <DialogHeader>
                  <DialogTitle>
                    Are you sure you want to delete this record?
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    This action cannot be undone. This will permanently delete
                    the FSIC record.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteDialogOpen(false)}
                    className="border-gray-600 text-gray-100 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isProcessing}
                    className="bg-red-600 hover:bg-red-500 text-white transition-colors duration-200"
                  >
                    {isProcessing ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 shadow-lg text-white">
            <CardHeader className="border-b border-gray-600 pb-4">
              <CardTitle className="flex items-center text-xl font-semibold ">
                <Info className="mr-2 h-5 w-5 text-blue-400" />
                General Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-white">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">FSIC Number:</span>
                  <span>{fsicData.fsicNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Last Update:</span>
                  <span>
                    {new Date(fsicData.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Establishment Name:</span>
                  <span>{fsicData.establishmentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Owner:</span>
                  <span>{fsicData.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Representative Name:</span>
                  <span>{fsicData.representativeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Trade Name:</span>
                  <span>{fsicData.tradeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Due Date:</span>
                  <span>
                    {fsicData.dueDate
                      ? `${fsicData.dueDate.month} ${fsicData.dueDate.day}`
                      : "Not set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Establishment Status:</span>
                  <span>{fsicData.establishmentStatus || "Not set"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 shadow-lg text-white">
            <CardHeader className="border-b border-gray-600 pb-4">
              <CardTitle className="flex items-center text-xl font-semibold">
                <Building className="mr-2 h-5 w-5 text-green-400" />
                Building Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Total Build Area:</span>
                  <span>{fsicData.totalBuildArea} sqm</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Number of Occupants:</span>
                  <span>{fsicData.numberOfOccupants}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Type of Occupancy:</span>
                  <span>{fsicData.typeOfOccupancy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Type of Building:</span>
                  <span>{fsicData.typeOfBuilding}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">High Rise:</span>
                  <span>{fsicData.isHighRise ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">In Eminent Danger:</span>
                  <span>{fsicData.isInEminentDanger ? "Yes" : "No"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 shadow-lg text-white">
            <CardHeader className="border-b border-gray-600 pb-4">
              <CardTitle className="flex items-center text-xl font-semibold">
                <Briefcase className="mr-2 h-5 w-5 text-yellow-400" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Nature of Business:</span>
                  <span>{fsicData.natureOfBusiness}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Business ID No.:</span>
                  <span>{fsicData.businessIdentificationNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Tax ID No.:</span>
                  <span>{fsicData.taxIdentificationNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">DTI No.:</span>
                  <span>{fsicData.dtiNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">SEC No.:</span>
                  <span>{fsicData.secNo}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 shadow-lg text-white ">
            <CardHeader className="border-b border-gray-600 pb-4">
              <CardTitle className="flex items-center text-xl font-semibold">
                <Phone className="mr-2 h-5 w-5 text-purple-400" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Barangay:</span>
                  <span>{fsicData.barangay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Address:</span>
                  <span>{fsicData.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Email:</span>
                  <span>{fsicData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Landline:</span>
                  <span>{fsicData.landline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Mobile:</span>
                  <span>{fsicData.mobile}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <CertificateDialog
          isOpen={isCertDialogOpen}
          onClose={() => setIsCertDialogOpen(false)}
          onSubmit={handleCertificateDownload}
          defaultValues={{
            certificateType: "Business Permit",
            amountPaid: "",
            orNumber: "",
            chiefFSES: "",
            fireMarshal: "",
          }}
          establishmentInfo={{
            fsicNumber: fsicData?.fsicNumber,
            establishmentName: fsicData?.establishmentName,
            owner: fsicData?.owner,
            address: fsicData?.address,
          }}
        />
      </div>
    </div>
  );
}
