"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";
import PrintableFSICCertificate, { CertificateInfo } from "./FSICCertificate";
interface CertificateDownloadButtonProps {
  info: CertificateInfo;
}

const CertificateDownloadButton: React.FC<CertificateDownloadButtonProps> = ({
  info,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <>
      <div style={{ display: "none" }}>
        <div ref={contentRef}>
          <PrintableFSICCertificate info={info} />
        </div>
      </div>
      <Button
        className="bg-blue-800 hover:bg-blue-950"
        onClick={() => reactToPrintFn()}
      >
        Generate Certificate
      </Button>
    </>
  );
};

export default CertificateDownloadButton;
