"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

type Document = {
  id: number;
  name: string;
  status: "Pending" | "Approved" | "Rejected";
  url: string;
};

export function DocumentUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: "invoice.pdf",
      status: "Approved",
      url: "/fake-url/invoice.pdf",
    },
    {
      id: 2,
      name: "receipt.jpg",
      status: "Pending",
      url: "/fake-url/receipt.jpg",
    },
  ]);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    // Simulating file upload
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setDocuments([
          ...documents,
          {
            id: Date.now(),
            name: file.name,
            status: "Pending",
            url: URL.createObjectURL(file), // This is a temporary URL for demo purposes
          },
        ]);
        setFile(null);
        setUploadProgress(0);
        toast({
          title: "Document Uploaded",
          description:
            "Your document has been successfully uploaded and is pending review.",
        });
      }
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <Input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.png"
        />
        {file && (
          <div className="mt-4">
            <Button onClick={handleUpload}>Upload Document</Button>
          </div>
        )}
        {uploadProgress > 0 && (
          <Progress value={uploadProgress} className="mt-4" />
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Uploaded Documents</h3>
        <ul className="space-y-2">
          {documents.map((doc) => (
            <li key={doc.id} className="flex justify-between items-center">
              <span>{doc.name}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  doc.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : doc.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {doc.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
