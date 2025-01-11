import UploadDocument from "@/components/documents/upload-documents";
import { SessionProvider } from "next-auth/react";
import React from "react";

const DocumentPage = () => {
  return (
    <SessionProvider>
      <UploadDocument />
    </SessionProvider>
  );
};

export default DocumentPage;
