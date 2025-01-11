"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { saveDocumentToDb, uploadFile } from "@/actions/document-upload";
import { useSession } from "next-auth/react";

interface UploadZoneProps {
  onFileUploaded: (fileName: string, url: string) => void;
}

export function UploadZone({ onFileUploaded }: UploadZoneProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const session = useSession();
  const userId = session.data?.user?.id || "";

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadError(null);
    const file = acceptedFiles[0];

    if (file.size > 5 * 1024 * 1024) {
      // 5MB in bytes
      setUploadError("File size must be less than 5MB");
      return;
    }

    setSelectedFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
    noClick: !!selectedFile,
    noKeyboard: !!selectedFile,
  });

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadProgress(0);
    setUploadError(null);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress >= 90) {
            clearInterval(progressInterval);
            return prevProgress;
          }
          return prevProgress + 10;
        });
      }, 500);

      const result = (await uploadFile(formData)) as {
        title: string;
        success: boolean;
        url?: string;
        error?: string;
      };
      clearInterval(progressInterval);

      if (result.success && result.url) {
        setUploadProgress(100);
        onFileUploaded(selectedFile.name, result.url);
        setSelectedFile(null);
        saveDocumentToDb({ fileUrl: result.url, title: result.title, userId });
      } else {
        setUploadError(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Error in handleUpload:", error);
      setUploadError(
        "An unexpected error occurred: " + (error as Error).message
      );
    } finally {
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8
          flex flex-col items-center justify-center
          transition-colors
          ${
            selectedFile
              ? "border-primary bg-primary/5 cursor-default"
              : isDragActive
                ? "border-primary bg-primary/5 cursor-pointer"
                : "border-gray-200 hover:border-primary cursor-pointer"
          }
        `}
      >
        <input {...getInputProps()} />
        {selectedFile ? (
          <div className="flex items-center space-x-4">
            <File className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        ) : (
          <>
            <Upload className="h-10 w-10 text-gray-400 mb-4" />
            <p className="text-sm text-gray-600 text-center">
              {isDragActive
                ? "Drop the file here"
                : "Drag & drop a file here, or click to select"}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              PDF, JPG, or PNG (max 5MB)
            </p>
          </>
        )}
      </div>

      <div className="flex space-x-4">
        <Button onClick={selectedFile ? open : handleUpload} className="flex-1">
          {selectedFile ? "Change File" : "Upload Document"}
        </Button>
        {selectedFile && (
          <Button onClick={handleUpload} className="flex-1">
            Upload Document
          </Button>
        )}
      </div>

      {uploadProgress > 0 && (
        <Progress value={uploadProgress} className="w-full" />
      )}

      {uploadError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
