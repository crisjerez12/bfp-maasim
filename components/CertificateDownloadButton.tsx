import { Button } from "@/components/ui/button";
import { CertificateInfo } from "./FSICCertificate";

interface CertificateDownloadButtonProps {
  info: CertificateInfo;
  onGenerate: (blob: Blob) => void;
}

const CertificateDownloadButton: React.FC<CertificateDownloadButtonProps> = ({
  info,
  onGenerate,
}) => {
  const handleClick = async () => {
    const { default: FSICCertificate } = await import("./FSICCertificate");
    const { pdf } = await import("@react-pdf/renderer");
    const blob = await pdf(<FSICCertificate info={info} />).toBlob();
    onGenerate(blob);
  };

  return (
    <Button className="bg-blue-800 hover:bg-blue-950" onClick={handleClick}>
      Generate Certificate
    </Button>
  );
};

export default CertificateDownloadButton;
