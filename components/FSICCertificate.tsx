import React from "react";
import { Page, Text, View, Document, DocumentProps } from "@react-pdf/renderer";
import { format, addYears } from "date-fns";

export interface CertificateInfo {
  fsicNumber: string;
  establishmentName: string;
  owner: string;
  address: string;
  purpose: string;
  amountPaid: string;
  orNumber: string;
  chiefFSES: string;
  fireMarshal: string;
  certificateType: string;
}

interface FSICCertificateProps extends DocumentProps {
  info: CertificateInfo;
}

const FSICCertificate: React.FC<FSICCertificateProps> = ({
  info,
  ...props
}) => {
  const currentDate = new Date();
  const expirationDate = addYears(currentDate, 1);

  return (
    <Document {...props}>
      <Page size="A4" style={{ padding: "30px" }}>
        <View>
          <View style={{ fontSize: "15px" }}>
            <Text>Republic of the Philippines</Text>
            <Text>Department of the Interior and Local Government</Text>
            <Text>BUREAU OF FIRE PROTECTION</Text>
            <Text>MAASIM FIRE STATION</Text>
            <Text>POBLACION, MARAWI</Text>
            <Text>LANAO DEL SUR PROVINCE</Text>
          </View>

          <Text>FSIC NO. {info.fsicNumber}</Text>

          <Text>FIRE SAFETY INSPECTION CERTIFICATE</Text>
          <Text>(FOR BUSINESS PERMIT)</Text>

          <View>
            <Text>TO WHOM IT MAY CONCERN:</Text>
            <Text>
              By virtue of the provisions of RA 9514 otherwise known as the Fire
              Code of the Philippines of 2008, the application for FIRE SAFETY
              INSPECTION CERTIFICATE of <Text>{info.establishmentName}</Text>
            </Text>
            <Text>
              owned and managed by <Text>{info.owner}</Text>
            </Text>
            <Text>
              at <Text>{info.address}</Text>
            </Text>
            <Text>
              is hereby GRANTED after said building structure or facility has
              been duly inspected with the findings that it has fully complied
              with the fire safety and protection requirements of the Fire Code
              of the Philippines of 2008 and its Implementing Rules and
              Regulations.
            </Text>
            <Text>
              This certificate is being issued for <Text>{info.purpose}</Text>
            </Text>
            <Text>{"\n"}</Text>
            <Text>
              This certification is valid until{" "}
              <Text>{format(expirationDate, "MM/dd/yyyy")}</Text>
            </Text>
          </View>

          <View>
            <Text>Fire Code Fees:</Text>
            <View>
              <Text>Amount Paid:</Text>
              <Text>{info.amountPaid}</Text>
            </View>
            <View>
              <Text>O.R. Number:</Text>
              <Text>{info.orNumber}</Text>
            </View>
            <View>
              <Text>Date:</Text>
              <Text>{format(currentDate, "MM/dd/yyyy")}</Text>
            </View>
          </View>

          <View>
            <View>
              <View />
              <Text>{info.chiefFSES}</Text>
              <Text>CHIEF, FSES</Text>
            </View>
            <View>
              <View />
              <Text>{info.fireMarshal}</Text>
              <Text>CITY/MUNICIPAL FIRE MARSHAL</Text>
            </View>
          </View>

          <View>
            <Text>THIS CERTIFICATE SHALL BE POSTED CONSPICUOUSLY</Text>
            <Text>&quot;FIRE SAFETY IS OUR MAIN CONCERN&quot;</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default FSICCertificate;
