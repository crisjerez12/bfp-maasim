"use client";

import { useState, useEffect } from "react";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { DownloadIcon } from "lucide-react";

// Define the schema for the API response
const EstablishmentSchema = z.object({
  _id: z.string(),
  fsicNumber: z.number(),
  establishmentName: z.string(),
  owner: z.string(),
  representativeName: z.string(),
  tradeName: z.string(),
  totalBuildArea: z.number(),
  numberOfOccupants: z.number(),
  typeOfOccupancy: z.string(),
  typeOfBuilding: z.string(),
  natureOfBusiness: z.string(),
  businessIdentificationNo: z.string(),
  taxIdentificationNo: z.string(),
  dtiNo: z.string(),
  secNo: z.string(),
  isHighRise: z.boolean(),
  isInEminentDanger: z.boolean(),
  lastIssuanceType: z.string(),
  barangay: z.string(),
  address: z.string(),
  email: z.string(),
  landline: z.string(),
  compliance: z.string(),
  mobile: z.string(),
  isActive: z.boolean(),
  establishmentStatus: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

type EstablishmentDocument = z.infer<typeof EstablishmentSchema>;

const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(EstablishmentSchema),
});

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  section: {
    border: "1px solid black",
    margin: 10,
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#1E90FF",
    padding: "5px 0",
    color: "#FFFFFF",
    flexDirection: "row",
    fontWeight: "bold",
  },
  headerCell: {
    flex: 1,
    fontSize: 8,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
    alignItems: "center",
    height: "auto",
    fontStyle: "bold",
  },
  cell: {
    flex: 1,
    fontSize: 8,
    textAlign: "center",
  },
});

// Define the PDF document component
const MyDocument: React.FC<{ data: EstablishmentDocument[] }> = ({ data }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.headerCell}>NO</Text>
          <Text style={styles.headerCell}>Establishment Name</Text>
          <Text style={styles.headerCell}>Address</Text>
          <Text style={styles.headerCell}>Barangay</Text>
          <Text style={styles.headerCell}>Type of Occupancy</Text>
          <Text style={styles.headerCell}>High Rise</Text>
          <Text style={styles.headerCell}>Eminent Danger</Text>
          <Text style={styles.headerCell}>Compliance</Text>
          <Text style={styles.headerCell}>Last Update</Text>
          <Text style={styles.headerCell}>Contact #</Text>
          <Text style={styles.headerCell}>Active Status</Text>
        </View>
        {data.map((item, index) => (
          <View key={item._id} style={styles.row}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{item.establishmentName}</Text>
            <Text style={styles.cell}>{item.address}</Text>
            <Text style={styles.cell}>{item.barangay}</Text>
            <Text style={styles.cell}>{item.typeOfOccupancy}</Text>
            <Text style={styles.cell}>{item.isHighRise ? "Yes" : "No"}</Text>
            <Text style={styles.cell}>
              {item.isInEminentDanger ? "Yes" : "No"}
            </Text>
            <Text style={styles.cell}>{item.compliance}</Text>
            <Text style={styles.cell}>
              {new Date(item.updatedAt).toLocaleDateString()}
            </Text>
            <Text style={styles.cell}>{item.mobile}</Text>
            <Text style={styles.cell}>
              {item.isActive ? "Active" : "not Active"}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const PdfViewer: React.FC = () => {
  const [data, setData] = useState<EstablishmentDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/fsic");
        const result = await response.json();
        const parsedResult = ApiResponseSchema.parse(result);
        if (parsedResult.success) {
          setData(parsedResult.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenPdf = async () => {
    if (data.length === 0) {
      return;
    }

    try {
      setIsLoading(true);
      const blob = await pdf(<MyDocument data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleOpenPdf}
      disabled={isLoading || data.length === 0}
      className="bg-blue-800 hover:bg-blue-900"
    >
      <DownloadIcon />
      {isLoading ? "Loading..." : "Download"}
    </Button>
  );
};

export default PdfViewer;
