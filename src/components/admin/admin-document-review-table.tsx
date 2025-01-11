"use client";

import { useEffect, useState } from "react";
import { Eye, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { usersDataType } from "@/lib/definitions";
import axios from "axios";

export function DocumentReviewTable({
  usersData,
}: {
  usersData: usersDataType[];
}) {
  const documents = usersData.flatMap((user) => user.documents);
  const [reviewingDocuments, setReviewingDocuments] = useState(documents);
  const { toast } = useToast();

  useEffect(() => {
    setReviewingDocuments(usersData.flatMap((user) => user.documents));
  }, [usersData]);

  const handleApprove = async (documentId: string) => {
    try {
      await axios.patch("/api/change-document-status", {
        documentId,
        status: "approved",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to update document status. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setReviewingDocuments((prevDocs) =>
      prevDocs.map((doc) =>
        doc.id === documentId ? { ...doc, status: "approved" } : doc
      )
    );

    toast({
      title: "Success",
      description: "Document approved successfully",
    });
  };

  const handleReject = async (documentId: string) => {
    try {
      await axios.patch("/api/change-document-status", {
        documentId,
        status: "rejected",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to update document status. Please try again.",
        variant: "destructive",
      });
      return;
    }
    setReviewingDocuments((prevDocs) =>
      prevDocs.map((doc) =>
        doc.id === documentId ? { ...doc, status: "rejected" } : doc
      )
    );
    toast({
      title: "Success",
      description: "Document rejected successfully",
    });
  };

  const handleView = (documentId: string) => {
    // Open the document URL in a new tab
    const doc = reviewingDocuments.find((doc) => doc.id === documentId);
    if (doc?.fileUrl) {
      window.open(doc.fileUrl, "_blank");
    }
    toast({
      title: "View Document",
      description: `Viewing document ${doc?.title}`,
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>File Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviewingDocuments.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.user.email}</TableCell>
              <TableCell>{doc.title}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    doc.status === "approved"
                      ? "default"
                      : doc.status === "rejected"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {doc.status.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(doc.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {doc.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApprove(doc.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(doc.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
