import React from "react";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import dilgLogo from "@/public/dilg-logo.svg";
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
    <div className=" w-[21.59cm]  font-arial text-white">
      <div className=" px-[1.7cm] border-double border-4 border-white">
        <div className="flex justify-center mt-4">
          <Image
            src={dilgLogo}
            alt="bfp-logo"
            width="91"
            height="91"
            className="rounded-full mt-8 absolute left-[50px] opacity-0"
          />
          <div className="text-center  leading-tight mt-10">
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
          <Image
            src={dilgLogo}
            alt="bfp-logo"
            width="91"
            height="91"
            className="rounded-full mt-6 absolute right-[50px] opacity-0"
          />
        </div>
        {/* Subheader */}
        <div className=" flex px-11 justify-between">
          <div className="flex text-[20px] font-bold ">
            <p>FSIC NO. R</p>
            <p className=" text-center decoration-2 text-red-600 pl-7 pb-1">
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
        <div className=" flex pl-2 flex-col text-center mt-4 mb-6 items-center  leading-[1.15] font-bold">
          <div className="flex flex-col items-start text-[16px] space-y-[2px]">
            <div className="flex items-center space-y-1 pt-7 ">
              <div className="w-[0.42cm] h-[0.43cm]  flex items-center justify-center text-black">
                {info.purpose === "FOR CERTIFICATE OF OCCUPANCY" && "✔️"}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-[0.42cm] h-[0.43cm]  flex items-center justify-center text-black">
                {info.purpose === "FOR BUSINESS PERMIT (NEW/RENEWAL)" && "✔️"}
              </div>
            </div>
            <div className="flex items-center space-x-2 ">
              <div className="w-[0.42cm] h-[0.43cm]  flex items-center justify-center text-black ">
                {info.purpose === "OTHERS" && "✔️"}
              </div>
              <div className="flex space-x-1 min-w-[300px]">
                <p className="text-black pl-[66px] ">
                  {info.otherPurpose || ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="leading-[1.3] text-[13px] pt-16">
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

          <div className="mt-12">
            <p className="w-full whitespace-pre-wrap text-black indent-[245px] h-14 align-text-top leading-[28px] px-10 ">
              {info.description}
            </p>
            <p className="text-black text-end mt-[-20px] pr-8">{newDate}</p>
          </div>
        </div>

        {/* Fire Code Fees */}
        <div className="leading-[1.15] flex justify-between pt-22 pl-16 text-[13px]">
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
              <p className="w-full text-black text-center mt-[75px] ">
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
