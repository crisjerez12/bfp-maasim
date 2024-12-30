import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  DocumentProps,
} from "@react-pdf/renderer";
import { format, addYears } from "date-fns";

Font.register({
  family: "Times-Roman",
  src: "https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman@1.0.4/Times-New-Roman.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Times-Roman",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  headerText: {
    fontSize: 10,
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 20,
  },
  fsicNumber: {
    marginBottom: 20,
  },
  content: {
    marginBottom: 10,
  },
  underline: {
    textDecoration: "underline",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
  },
  footerText: {
    fontSize: 8,
    textAlign: "center",
    marginBottom: 4,
  },
  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 40,
  },
  signatureBox: {
    width: 200,
    textAlign: "center",
  },
  signatureLine: {
    borderBottom: 1,
    marginBottom: 4,
  },
  signatureTitle: {
    fontSize: 8,
    textAlign: "center",
  },
  fees: {
    marginTop: 20,
  },
  feesRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  feesLabel: {
    width: 80,
  },
});

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
  certificateType: string; // Added this field
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
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Republic of the Philippines</Text>
          <Text style={styles.headerText}>
            Department of the Interior and Local Government
          </Text>
          <Text style={styles.headerText}>BUREAU OF FIRE PROTECTION</Text>
          <Text style={styles.headerText}>MARAWI FIRE STATION</Text>
          <Text style={styles.headerText}>POBLACION, MARAWI</Text>
          <Text style={styles.headerText}>LANAO DEL SUR PROVINCE</Text>
        </View>

        <Text style={styles.fsicNumber}>FSIC NO. {info.fsicNumber}</Text>

        <Text style={styles.title}>FIRE SAFETY INSPECTION CERTIFICATE</Text>
        <Text style={styles.subtitle}>(FOR BUSINESS PERMIT)</Text>

        <View style={styles.content}>
          <Text>TO WHOM IT MAY CONCERN:</Text>
          <Text>{"\n"}</Text>
          <Text>
            By virtue of the provisions of RA 9514 otherwise known as the Fire
            Code of the Philippines of 2008, the application for FIRE SAFETY
            INSPECTION CERTIFICATE of{" "}
            <Text style={styles.underline}>{info.establishmentName}</Text>
          </Text>
          <Text>{"\n"}</Text>
          <Text>
            owned and managed by{" "}
            <Text style={styles.underline}>{info.owner}</Text>
          </Text>
          <Text>
            at <Text style={styles.underline}>{info.address}</Text>
          </Text>
          <Text>{"\n"}</Text>
          <Text>
            is hereby GRANTED after said building structure or facility has been
            duly inspected with the findings that it has fully complied with the
            fire safety and protection requirements of the Fire Code of the
            Philippines of 2008 and its Implementing Rules and Regulations.
          </Text>
          <Text>{"\n"}</Text>
          <Text>
            This certificate is being issued for{" "}
            <Text style={styles.underline}>{info.purpose}</Text>
          </Text>
          <Text>{"\n"}</Text>
          <Text>
            This certification is valid until{" "}
            <Text style={styles.underline}>
              {format(expirationDate, "MM/dd/yyyy")}
            </Text>
          </Text>
        </View>

        <View style={styles.fees}>
          <Text>Fire Code Fees:</Text>
          <View style={styles.feesRow}>
            <Text style={styles.feesLabel}>Amount Paid:</Text>
            <Text style={styles.underline}>{info.amountPaid}</Text>
          </View>
          <View style={styles.feesRow}>
            <Text style={styles.feesLabel}>O.R. Number:</Text>
            <Text style={styles.underline}>{info.orNumber}</Text>
          </View>
          <View style={styles.feesRow}>
            <Text style={styles.feesLabel}>Date:</Text>
            <Text style={styles.underline}>
              {format(currentDate, "MM/dd/yyyy")}
            </Text>
          </View>
        </View>

        <View style={styles.signatures}>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureTitle}>{info.chiefFSES}</Text>
            <Text style={styles.signatureTitle}>CHIEF, FSES</Text>
          </View>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureTitle}>{info.fireMarshal}</Text>
            <Text style={styles.signatureTitle}>
              CITY/MUNICIPAL FIRE MARSHAL
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            THIS CERTIFICATE SHALL BE POSTED CONSPICUOUSLY
          </Text>
          <Text style={styles.footerText}>
            &quot;FIRE SAFETY IS OUR MAIN CONCERN&quot;
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default FSICCertificate;
