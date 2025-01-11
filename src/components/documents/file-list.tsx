"use client";

import { File } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface UploadedFile {
  name: string;
  status: "uploading" | "pending" | "approved" | "rejected";
  progress?: number;
}

interface FileListProps {
  files: UploadedFile[];
}

export function FileList({ files }: FileListProps) {
  const getStatusColor = (status: UploadedFile["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Uploaded Documents</h2>
      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex items-center justify-between p-3 bg-white rounded-lg border"
          >
            <div className="flex items-center space-x-3 flex-1">
              <File className="h-5 w-5 text-gray-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                {file.status === "uploading" && file.progress !== undefined && (
                  <Progress value={file.progress} className="h-1 mt-2" />
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge
                variant="secondary"
                className={`${getStatusColor(file.status)} text-white capitalize`}
              >
                {file.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
