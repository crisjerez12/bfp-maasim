import React from "react";
import { format, addYears } from "date-fns";
import Image from "next/image";
import dilgLogo from "@/public/dilg-logo.png";
import bfplogo from "@/public/logo.png";
import { Check } from "lucide-react";

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
}

interface PrintableFSICCertificateProps {
  info: CertificateInfo;
}

const PrintableFSICCertificate: React.FC<PrintableFSICCertificateProps> = ({
  info,
}) => {
  const currentDate = new Date();
  const expirationDate = addYears(currentDate, 1);
  console.log(info);
  return (
    <div className="py-[3mm] px-[16mm] w-[210mm] h-[297mm] border-[1px] border-black bg-white">
      {/* Header */}
      <div className="px-[5mm] pt-[2mm] border-double border-[5px] border-black">
        <div className="flex justify-between">
          <Image
            src={dilgLogo}
            alt="dilg-logo"
            width="90"
            height="90"
            className="rounded-full mt-6"
          />
          <div className="text-center mb-3 leading-tight">
            <p className="text-base">Republic of the Philippines</p>
            <p className="font-bold">
              Department of the Interior and Local Government
            </p>
            <p className="text-lg font-bold">BUREAU OF FIRE PROTECTION</p>
            <p className="font-semibold">REGIONAL OFFICE - XII</p>
          </div>
          <Image
            src={bfplogo}
            alt="dilg-logo"
            width="90"
            height="90"
            className="rounded-full mt-6"
          />
        </div>
        {/* Subheader */}
        <div className="mt-8 flex px-5 justify-between">
          <div className="flex w-60 space-x-1 text-[19px] font-bold text-red-600">
            <p>FSIC NO. R</p>
            <p className="border-b-[3px] border-red-600  h-[25px]  flex-1 text-center ">
              {info.fsicNumber}
            </p>
          </div>
          <div className="flex flex-col items-center w-40 mt-[-3px]">
            <div className="border-b-[3px] border-black  h-6 flex-1  w-full text-center">
              {format(currentDate, "MM/dd/yyyy")}
            </div>
            <p>Date</p>
          </div>
        </div>
        <div className=" flex flex-col text-center mb-6 items-center text-red-900 leading-tight font-bold">
          <p className="font-bold text-[29px]">
            FIRE SAFETY INSPECTION CERTIFICATE
          </p>
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-2">
              <div
                className={`w-5 h-5 border-2 border-red-900 flex items-center justify-center ${
                  info.purpose === "FOR CERTIFICATE OF OCCUPANCY"
                    ? "bg-red-900"
                    : ""
                }`}
              >
                {info.purpose === "FOR CERTIFICATE OF OCCUPANCY" && (
                  <Check className="text-white" size={16} />
                )}
              </div>
              <p>FOR CERTIFICATE OF OCCUPANCY </p>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-5 h-5 border-2 border-red-900 flex items-center justify-center ${
                  info.purpose === "FOR BUSINESS PERMIT (NEW/RENEWAL)"
                    ? "bg-red-900"
                    : ""
                }`}
              >
                {info.purpose === "FOR BUSINESS PERMIT (NEW/RENEWAL)" && (
                  <Check className="text-white" size={16} />
                )}
              </div>
              <p>FOR BUSINESS PERMIT (NEW/RENEWAL)</p>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-5 h-5 border-2 border-red-900 flex items-center justify-center ${
                  info.purpose === "OTHERS" ? "bg-red-900" : ""
                }`}
              >
                {info.purpose === "OTHERS" && (
                  <Check className="text-white" size={16} />
                )}
              </div>
              <div className="flex space-x-1 min-w-[300px]">
                <p>OTHERS</p>
                {info.purpose === "OTHERS" && (
                  <p className=" flex-1 border-b-[1px] border-red-900 text-left pl-2">
                    {info.otherPurpose}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="leading-tight text-[13px]">
          <p className="text-[16px] font-bold ">TO WHOM IT MAY CONCERN:</p>
          <p className="ml-12 text-[13px]">
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
          <p className="w-full border-b-2 border-black text-center">
            {info.establishmentName}
          </p>

          <p className="text-center text-[13px]">(Name of Establishment)</p>
          <div className="flex space-x-1 justify-between">
            <p className="text-nowrap">owned and managed by</p>
            <p className="w-full border-b-2 border-black text-center">
              {info.owner}
            </p>
            <p className="text-nowrap">with postal address at</p>
          </div>
          <p className="text-center">(Name of Owner/Representative)</p>
          <p className="w-full border-b-2 border-black text-center">
            {info.address}
          </p>
          <p className="text-center text-[13px]">(Address)</p>

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
              <p className="w-full border-b-2 border-black  whitespace-pre-wrap ">
                {info.description}
              </p>
              <p className="text-center w-full">(Description)</p>
            </div>
          </div>
          <div className="flex">
            <p className="text-nowrap">valid until</p>
            <p className="w-full border-b-2 border-black text-center">
              {format(expirationDate, "MM/dd/yyyy")}
            </p>
          </div>
          <p className="mt-5">
            <span className="ml-12">
              Violation of Fire Code provisions shall cause this certificate
              null and void after appropriate proceeding
            </span>
            and shall hold the owner liable to the penalties provided for by the
            said Fire Code.
          </p>
        </div>

        {/* Fire Code Fees */}
        <div className="flex justify-between">
          <div className="mb-5">
            <p className="font-bold">Fire Code Fees:</p>
            <div className="flex space-x-1">
              <p className="text-nowrap">Amount Paid:</p>
              <p className="w-full border-b-2 border-black text-end">
                {info.amountPaid}
              </p>
            </div>
            <div className="flex space-x-1">
              <p className="text-nowrap">O.R. Number:</p>
              <p className="w-full border-b-2 border-black text-end">
                {info.orNumber}
              </p>
            </div>
            <div className="flex space-x-1">
              <p className="text-nowrap">Date:</p>
              <p className="w-full border-b-2 border-black text-end">
                {format(currentDate, "MM/dd/yyyy")}
              </p>
            </div>
          </div>

          {/* Signatures */}
          <div>
            <p className="mb-3 font-bold">RECOMMEND APPROVAL:</p>
            <p className="w-full border-b-2 border-black text-center">
              {info.chiefFSES}
            </p>
            <p>CHIEF, Fire Safety Enforcement Section</p>
            <p className="mt-5 font-bold mb-3">APPROVED:</p>
            <div>
              <p className="w-full border-b-2 border-black text-center">
                {info.fireMarshal}
              </p>
              <p className="text-center">CITY/MUNICIPAL FIRE MARSHAL</p>
            </div>
          </div>
        </div>
        {/* Notes */}
        <div className="mt-7 text-center font-bold">
          <p className="italic">
            NOTE: &apos;This Certificate does not take the place of any license
            required by law and is not transferable. Any change in the use of
            occupancy of the premises shall require a new certificate.&apos;
          </p>
          <p className="text-xl mt-1">
            THIS CERTIFICATE SHALL BE POSTED CONSPICUOUSLY
          </p>
          <p className="text-red-700">
            PAALALA: &apos;MAHIGPIT NA IPINAGBABAWAL NG PAMUNUAN NG BUREAU OF
            FIRE PROTECTION SA MGA KAWANI NITO ANG MAGREKOMENDA NG ANUMANG BRAND
            NG FIRE EXTINGUISHER&apos;
          </p>
          <div className="flex ml-[-10px] gap-2">
            <div className="border-[1px] text-xs border-black font-bold mt-2 py-1 px-[2px]">
              Applicant/Owner&apos;s COPY
            </div>
            <p className="text-lg">
              &apos;FIRE SAFETY IS OUR MAIN CONCERN&apos;
            </p>
          </div>
        </div>

        <div className="absolute ">BFP-QSF-FSED-005 Rev. 03 (03.03.20)</div>
      </div>
    </div>
  );
};

export default PrintableFSICCertificate;
