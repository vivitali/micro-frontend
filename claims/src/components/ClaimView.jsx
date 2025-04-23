import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const ClaimView = () => {
  const { id } = useParams();
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClaim = async () => {
      try {
        setLoading(true);

        // Simulated data
        const mockResponse = {
          id,
          claimNumber: `CLM-${id}`,
          status: "PENDING",
          submittedDate: new Date().toISOString(),
          claimAmount: 1250.75,
          policyHolder: "John Doe",
          description: "Vehicle damage claim",
          coverageType: "Comprehensive",
          assignedTo: "Sarah Johnson",
        };

        // Simulate network delay
        setTimeout(() => {
          setClaim(mockResponse);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to load claim data");
        setLoading(false);
      }
    };

    fetchClaim();
  }, [id]);

  if (loading)
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardContent>
      </Card>
    );

  if (error)
    return (
      <Card className="w-full max-w-lg mx-auto border-red-200">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Claim #{claim.claimNumber}</CardTitle>
          <Badge variant={claim.status === "PENDING" ? "outline" : "default"}>
            {claim.status}
          </Badge>
        </div>
        <CardDescription>
          Submitted on {new Date(claim.submittedDate).toLocaleDateString()}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <span className="text-muted-foreground">Amount:</span>
          <span className="font-medium">${claim.claimAmount.toFixed(2)}</span>

          <span className="text-muted-foreground">Policy Holder:</span>
          <span className="font-medium">{claim.policyHolder}</span>

          <span className="text-muted-foreground">Coverage:</span>
          <span className="font-medium">{claim.coverageType}</span>

          <span className="text-muted-foreground">Assigned To:</span>
          <span className="font-medium">{claim.assignedTo}</span>
        </div>

        <Separator className="my-3" />

        <div className="text-sm">
          <p className="text-muted-foreground font-medium mb-1">Description:</p>
          <p>{claim.description}</p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => (window.location.href = `/raw-claim/${id}`)}
        >
          View Raw Data
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

export default ClaimView;
