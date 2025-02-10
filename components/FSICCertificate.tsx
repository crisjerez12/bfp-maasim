import React from "react";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import dilgLogo from "@/public/dilg-logo.svg";
import certificate from "@/public/cert.jpg";
export interface CertificateInfo {
  fsicNumber: string;
  establishmentName: string;
  owner: string;
  address: string;
  purpose: string;
  otherPurpose?: string;
  amountPaid: string;
  orNumber: string;
  chiefFSES: string;
  fireMarshal: string;
  description: string;
  orDate?: string;
}

interface PrintableFSICCertificateProps {
  info: CertificateInfo;
}

const PrintableFSICCertificate: React.FC<PrintableFSICCertificateProps> = ({
  info,
}) => {
  const formatedFSICNumber = info.fsicNumber
    .padStart(7, "0")
    .replace(/(\d{3})$/, "-$1");
  function addOneYear() {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    const formattedDate =
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      date.getDate().toString().padStart(2, "0") +
      "/" +
      date.getFullYear();

    return formattedDate;
  }
  const newDate = addOneYear();

  return (
    <div>
      {/* <Image
        src={certificate}
        alt="certificate"
        width={2200}
        height={2000}
        className="absolute -top-[16px] opacity-20"
      /> */}
      <div className=" w-[21.59cm] h-[27.94 cm] font-arial text-white">
        <div className="flex justify-center mt-6 ">
          <div className="text-center  leading-tight mt-9">
            <p className="text-[15px] text-white">
              Republic of the Philippines
            </p>
            <p className="font-bold text-[16px] text-white">
              Department of the Interior and Local Government
            </p>
            <p className="text-[19px] font-bold text-white">
              BUREAU OF FIRE PROTECTION
            </p>
            <p className=" text-[16px] text-white">Region 12</p>
            <p className=" text-[16px] text-black">Province of Sarangani</p>
            <p className=" text-[16px] text-black">Maasim Fire Station</p>
            <p className=" text-[16px] text-black">
              Municipal Compound, Poblacion, Maasim, Sarangani Province
            </p>
            <p className=" text-[16px] italic font-serif text-black">
              Hotline No. 09124588541/09656333570 Email Add:
              <span className="underline text-blue-700">
                maasimfirestation@gmail.com
              </span>
            </p>
          </div>
        </div>
        {/* Subheader */}
        <div className=" flex pl-36  pr-28 justify-between">
          <div className="flex text-[20px] font-bold ">
            <p>FSIC NO. R</p>
            <p className=" text-center decoration-2 text-red-600">
              12-{formatedFSICNumber}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="pr-8 decoration-2  text-center font-bold text-[15px] text-black pt-1">
              {format(new Date(), "MM/dd/yyyy")}
            </div>
            <p>Date</p>
          </div>
        </div>
        <div className=" flex  flex-col text-center mt-5 mb-5 items-center  leading-[1.15] font-bold">
          <div className="flex flex-col items-start  text-sm">
            <div className="flex items-center mt-6 ">
              <div className="w-[0.42cm] h-[0.43cm] flex items-center justify-center text-black">
                {info.purpose === "FOR CERTIFICATE OF OCCUPANCY" && "✔️"}
              </div>
            </div>
            <div className="flex items-center mt-[1px]">
              <div className="w-[0.42cm] h-[0.43cm]  flex items-center justify-center text-black">
                {info.purpose === "FOR BUSINESS PERMIT (NEW/RENEWAL)" && "✔️"}
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-[0.42cm] h-[0.43cm]  flex items-center justify-center text-black ">
                {info.purpose === "OTHERS" && "✔️"}
              </div>
              <div className="flex min-w-[300px] ">
                <p className="text-black text-[16px] -mt-[1px] pl-[75px] ">
                  {info.otherPurpose || ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="leading-[1.3] text-[13px] mt-20">
          <p className="w-full  text-center text-black">
            {info.establishmentName}
          </p>

          <p className="italic text-center text-[12px]">
            (Name of Establishment)
          </p>
          <div className="flex space-x-1 justify-between">
            <p className="text-nowrap">owned and managed by</p>
            <p className="w-full  text-center text-black">{info.owner}</p>
            <p className="text-nowrap">with postal address at</p>
          </div>
          <p className="text-center italic text-[12px]">
            (Name of Owner/Representative)
          </p>
          <p className="w-full text-center italize text-black">
            {info.address}
          </p>
          <p className="text-center text-[12px] italic">(Address)</p>

          <div className="mt-[52px] pl-14 pr-28">
            <p className="w-full whitespace-pre-wrap  text-black indent-[245px] h-14 align-text-top leading-[28px] px-10 ">
              {info.description}
            </p>
            <p className="text-black text-end mt-[-25px] ">{newDate}</p>
          </div>
        </div>

        {/* Fire Code Fees */}
        <div className="leading-[1.15] flex justify-between mt-[90px] pt-1 pl-48 pr-16 text-[13px]">
          <div>
            <div className="flex space-x-1">
              <p className="text-nowrap">Amount Paid:</p>
              <p className="w-full text-black text-end">{info.amountPaid}</p>
            </div>
            <div className="flex space-x-1">
              <p className="text-nowrap">O.R. Number:</p>
              <p className="w-full text-black text-end">{info.orNumber}</p>
            </div>
            <div className="flex space-x-1">
              <p className="text-nowrap">Date:</p>
              <p className="w-full text-black text-end">
                {info?.orDate
                  ? format(parseISO(info.orDate), "MM/dd/yyyy")
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Signatures */}
          <div className="leading-[1.15] ">
            <p className="w-full text-black text-center mr-[178px] pt-4 ">
              {info.chiefFSES}
            </p>
            <div>
              <p className="w-full text-black text-center mt-[72px] ">
                {info.fireMarshal}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PrintableFSICCertificate;
