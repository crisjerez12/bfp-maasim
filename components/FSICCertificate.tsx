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
  certificateType: string;
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
  return (
    <div className="pt-[0.79cm] px-[0.55cm] w-[21.59cm]  font-arial text-white">
      <div className="relative px-[1.7cm] border-double border-4 border-white ">
        <div className="flex justify-center">
          <Image
            src={dilgLogo}
            alt="bfp-logo"
            width="91"
            height="91"
            className="rounded-full mt-6 absolute left-[50px] bg-transparent"
          />
          <div className="text-center mb-5 leading-tight">
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
        <div className=" flex px-5 justify-between">
          <div className="flex   text-[22px] font-bold ">
            <p>FSIC NO. R</p>
            <p className=" text-center decoration-2 text-red-600">
              12-{formatedFSICNumber}
            </p>
          </div>
          <div className="flex flex-col items-center mt-2">
            <div className=" decoration-2  text-center font-bold text-[15px] text-black">
              &nbsp;&nbsp;&nbsp; {format(new Date(), "MM/dd/yyyy")}
              &nbsp;&nbsp;&nbsp;
            </div>
            <p>Date</p>
          </div>
        </div>
        <div className=" flex flex-col mt-4 text-center mb-6 items-center  leading-[1.15] font-bold">
          <p className="font-bold text-[26px]">
            FIRE SAFETY INSPECTION CERTIFICATE
          </p>
          <div className="flex flex-col items-start text-[16px] space-y-[2px]">
            <div className="flex items-center space-x-2">
              <div className="w-[0.42cm] h-[0.43cm]   flex items-center justify-center "></div>
              <p>FOR CERTIFICATE OF OCCUPANCY </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-[0.42cm] h-[0.43cm]   flex items-center justify-center "></div>
              <p>FOR BUSINESS PERMIT (NEW/RENEWAL)</p>
            </div>
            <div className="flex items-center space-x-2 ">
              <div className="w-[0.42cm] h-[0.43cm]  flex items-center justify-center  "></div>
              <div className="flex space-x-1 min-w-[300px] ">
                <p className="">OTHERS</p>
                <p className="text-black">{info.otherPurpose || ""}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="leading-[1.3] text-[13px] ">
          <p className="text-[15px] font-bold ">TO WHOM IT MAY CONCERN:</p>
          <p className="text-[11px]">&nbsp;</p>
          <p className="indent-14">
            By virtue of the provisions of RA 9514 otherwise known as the Fire
            Code of the Philippines of
          </p>
          <div className="flex justify-between text-[13px]">
            <p>2008,</p>
            <p>the</p>
            <p>application</p>
            <p>for</p>
            <p className="font-bold">FIRE</p>
            <p className="font-bold">SAFETY</p>
            <p className="font-bold">INSPECTION</p>
            <p className="font-bold">CERTIFICATE</p>
            <p>of:</p>
          </div>
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

          <p>
            is hereby
            <span className="font-bold px-2">GRANTED</span>
            after said building structure or facility has been duly inspected
            with the finding that it has fully complied with the fire safety and
            protection requirements of the Fire Code of the Philippines of 2008
            and its Revised Implementing Rules and Regulations.
          </p>
          <div className="mt-2 ml-12 flex space-x-2">
            <p className="text-nowrap">This certification is valid for </p>
            <div className="flex flex-col items-start w-full text-center">
              <p className="w-full  whitespace-pre-wrap text-black">
                <span>{info.description}</span>
              </p>
              <p className="text-center w-full italic ">
                <span className=" text-[12px]">(Description)</span>
              </p>
            </div>
          </div>

          <p className="mt-5 indent-14">
            Violation of Fire Code provisions shall cause this certificate null
            and void after appropriate proceeding and shall hold the owner
            liable to the penalties provided for by the said Fire Code.
          </p>
        </div>

        {/* Fire Code Fees */}
        <div className="leading-[1.15] flex justify-between pt-[22px] text-[13px]">
          <div className="mb-5">
            <p className="font-bold">Fire Code Fees:</p>
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
                  : ""}
              </p>
            </div>
          </div>

          {/* Signatures */}
          <div className="leading-[1.15]">
            <p className="mb-[13px] font-bold">RECOMMEND APPROVAL:</p>
            <p className="w-full text-black text-center">{info.chiefFSES}</p>
            <p>CHIEF, Fire Safety Enforcement Section</p>
            <p className="mt-[26px] font-bold mb-[13px]">APPROVED:</p>
            <div>
              <p className="w-full text-black text-center">
                {info.fireMarshal}
              </p>
              <p className="text-center">CITY/MUNICIPAL FIRE MARSHAL</p>
            </div>
          </div>
        </div>
        {/* Notes */}
        <div className="leading-[1.3] mt-7 text-center font-bold">
          <p className="italic text-[13px]">
            NOTE: &apos;This Certificate does not take the place of any license
            required by law and is not transferable. Any change in the use of
            occupancy of the premises shall require a new certificate.&apos;
          </p>
          <p className="text-[19px] mt-1">
            THIS CERTIFICATE SHALL BE POSTED CONSPICUOUSLY
          </p>
          <p className=" text-[11px]">
            PAALALA: &apos;MAHIGPIT NA IPINAGBABAWAL NG PAMUNUAN NG BUREAU OF
            FIRE PROTECTION SA MGA KAWANI NITO ANG MAGREKOMENDA NG ANUMANG BRAND
            NG FIRE EXTINGUISHER&apos;
          </p>
          <div className="flex ml-[-10px] gap-5">
            <div className=" text-[15px]  font-bold mt-2 pt-1 pb-3 pr-20 ml-[-50px] pl-1 ">
              BFP COPY
            </div>
            <p className="text-[19px] ">
              &apos;&apos;FIRE SAFETY IS OUR MAIN CONCERN&apos;&apos;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PrintableFSICCertificate;
