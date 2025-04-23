import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy } from "lucide-react";

const RawClaimView = () => {
  const { id } = useParams();
  const [rawData, setRawData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchRawClaim = async () => {
      try {
        setLoading(true);

        const mockResponse = {
          claimId: id,
          meta: {
            version: "1.2.0",
            processedTimestamp: new Date().toISOString(),
            source: "CLAIMS_PORTAL",
            trackingId: `TRK-${Math.random()
              .toString(36)
              .substring(2, 10)
              .toUpperCase()}`,
          },
          policy: {
            policyNumber: `POL-${Math.floor(Math.random() * 1000000)}`,
            effectiveDate: "2024-01-15T00:00:00Z",
            expirationDate: "2025-01-14T23:59:59Z",
            policyHolder: {
              id: "PH-12345",
              firstName: "John",
              lastName: "Doe",
              dateOfBirth: "1985-06-22",
              contactInfo: {
                email: "john.doe@example.com",
                phone: "555-123-4567",
                address: {
                  street: "123 Main St",
                  city: "Anytown",
                  state: "CA",
                  zipCode: "90210",
                },
              },
            },
            coverages: [
              {
                type: "COMPREHENSIVE",
                limit: 25000,
                deductible: 500,
              },
              {
                type: "LIABILITY",
                limit: 100000,
                deductible: 0,
              },
              {
                type: "COLLISION",
                limit: 15000,
                deductible: 1000,
              },
            ],
          },
          claim: {
            claimNumber: `CLM-${id}`,
            filingDate: new Date(
              Date.now() - 3 * 24 * 60 * 60 * 1000
            ).toISOString(),
            incidentDate: new Date(
              Date.now() - 5 * 24 * 60 * 60 * 1000
            ).toISOString(),
            status: "PENDING",
            statusHistory: [
              {
                status: "SUBMITTED",
                timestamp: new Date(
                  Date.now() - 3 * 24 * 60 * 60 * 1000
                ).toISOString(),
                updatedBy: "CUSTOMER",
              },
              {
                status: "UNDER_REVIEW",
                timestamp: new Date(
                  Date.now() - 2 * 24 * 60 * 60 * 1000
                ).toISOString(),
                updatedBy: "SYSTEM",
              },
              {
                status: "PENDING",
                timestamp: new Date(
                  Date.now() - 1 * 24 * 60 * 60 * 1000
                ).toISOString(),
                updatedBy: "AGENT_ID_4532",
              },
            ],
            description:
              "Vehicle damage claim resulting from backing into a pole in parking lot",
            claimAmount: 1250.75,
            assignedTo: {
              agentId: "AGT-789",
              name: "Sarah Johnson",
              department: "AUTO_CLAIMS",
              assignedDate: new Date(
                Date.now() - 2 * 24 * 60 * 60 * 1000
              ).toISOString(),
            },
            documents: [
              {
                id: "DOC-1",
                type: "INCIDENT_REPORT",
                uploadDate: new Date(
                  Date.now() - 3 * 24 * 60 * 60 * 1000
                ).toISOString(),
                fileSize: 1458302,
                mimeType: "application/pdf",
              },
              {
                id: "DOC-2",
                type: "PHOTO_EVIDENCE",
                uploadDate: new Date(
                  Date.now() - 3 * 24 * 60 * 60 * 1000
                ).toISOString(),
                fileSize: 3542987,
                mimeType: "image/jpeg",
              },
              {
                id: "DOC-3",
                type: "REPAIR_ESTIMATE",
                uploadDate: new Date(
                  Date.now() - 2 * 24 * 60 * 60 * 1000
                ).toISOString(),
                fileSize: 982345,
                mimeType: "application/pdf",
              },
            ],
          },
          _debug: {
            processingTime: "127ms",
            cacheMiss: true,
            apiVersion: "v3.2.1",
          },
        };

        // Simulate network delay
        setTimeout(() => {
          setRawData(mockResponse);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to load raw claim data");
        setLoading(false);
      }
    };

    fetchRawClaim();
  }, [id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(rawData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading)
    return (
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );

  if (error)
    return (
      <Card className="w-full max-w-xl mx-auto border-red-200">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">
          Raw Data: Claim #{rawData.claim.claimNumber}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 px-2"
        >
          <Copy className="h-4 w-4 mr-1" />
          {copied ? "Copied!" : "Copy"}
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="json">
          <TabsList className="w-full">
            <TabsTrigger value="json" className="flex-1">
              JSON
            </TabsTrigger>
            <TabsTrigger value="info" className="flex-1">
              Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="json" className="m-0">
            <div className="bg-muted rounded-md overflow-auto max-h-80">
              <pre className="text-xs p-4 whitespace-pre-wrap">
                {JSON.stringify(rawData, null, 2)}
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="info" className="m-0 p-4">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Claim ID:</dt>
              <dd>{rawData.claimId}</dd>

              <dt className="text-muted-foreground">Status:</dt>
              <dd>{rawData.claim.status}</dd>

              <dt className="text-muted-foreground">Filed:</dt>
              <dd>{new Date(rawData.claim.filingDate).toLocaleDateString()}</dd>

              <dt className="text-muted-foreground">Incident:</dt>
              <dd>
                {new Date(rawData.claim.incidentDate).toLocaleDateString()}
              </dd>

              <dt className="text-muted-foreground">Policy #:</dt>
              <dd>{rawData.policy.policyNumber}</dd>

              <dt className="text-muted-foreground">Documents:</dt>
              <dd>{rawData.claim.documents.length} files</dd>
            </dl>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between pt-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => (window.location.href = `/claim/${id}`)}
        >
          View Formatted
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RawClaimView;
