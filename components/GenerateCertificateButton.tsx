import React from "react";
import { Button } from "@/components/ui/button";
import { CertificateInfo } from "./FSICCertificate";

interface GenerateCertificateButtonProps {
  info: CertificateInfo;
  onGenerate: (blob: Blob) => void;
}

const GenerateCertificateButton: React.FC<GenerateCertificateButtonProps> = ({
  info,
  onGenerate,
}) => {
  const handleClick = async () => {
    const { default: FSICCertificate } = await import("./FSICCertificate");
    const { pdf } = await import("@react-pdf/renderer");
    const blob = await pdf(<FSICCertificate info={info} />).toBlob();
    onGenerate(blob);
  };

  return <Button onClick={handleClick}>Generate Certificate</Button>;
};

export default GenerateCertificateButton;
