"use client";

import { useEffect, useState } from "react";
import { UploadZone } from "@/components/documents/upload-zone";
import { FileList } from "@/components/documents/file-list";
import { Navbar } from "@/components/navbar";
import { useSession } from "next-auth/react";
import { getDocumentsForUser } from "@/actions/document-upload";

interface UploadedFile {
  name: string;
  status: "pending" | "approved" | "rejected";
  progress?: number;
  url?: string;
}

const navbarLinks = [
  { name: "Documents", href: "/documents" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function UploadDocument() {
  const session = useSession();
  const userId = session.data?.user?.id || "";

  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await getDocumentsForUser({ userId });
      if (Array.isArray(response)) {
        const transformedFiles = response.map((doc) => ({
          name: doc.title,
          status: doc.status.toLowerCase() as
            | "pending"
            | "approved"
            | "rejected",
          url: doc.fileUrl,
        }));
        setFiles(transformedFiles);
      }
    };
    fetchDocuments();
  }, [userId]);

  const handleFileUploaded = (fileName: string, url: string) => {
    setFiles((prev) => [
      ...prev,
      {
        name: fileName,
        status: "pending",
        url: url,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar name="PayGuard" links={navbarLinks} />
      <div className="container max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">Upload Documents</h1>
        <div className="space-y-8">
          <UploadZone onFileUploaded={handleFileUploaded} />
          {files.length > 0 && <FileList files={files} />}
        </div>
      </div>
    </div>
  );
}
