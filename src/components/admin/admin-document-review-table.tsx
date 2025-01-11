"use client";

import { useState } from "react";
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

// This would typically come from your database
const documents = [
  { id: "1", userId: "user1", fileName: "id_card.jpg", status: "pending" },
  { id: "2", userId: "user2", fileName: "passport.pdf", status: "pending" },
];

export function DocumentReviewTable() {
  const [reviewingDocuments, setReviewingDocuments] = useState(documents);
  const { toast } = useToast();

  const handleApprove = async (documentId: string) => {
    // This would typically be a server action
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
    // This would typically be a server action
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
    // In a real application, this would open the document in a new tab or modal
    toast({
      title: "View Document",
      description: `Viewing document ${documentId}`,
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>File Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviewingDocuments.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.userId}</TableCell>
              <TableCell>{doc.fileName}</TableCell>
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
                  {doc.status}
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleApprove(doc.id)}
                    disabled={doc.status !== "pending"}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReject(doc.id)}
                    disabled={doc.status !== "pending"}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
