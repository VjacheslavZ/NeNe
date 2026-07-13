'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { FileUploadAria } from '@/components/file-upload-are';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getImageUrl } from '@/lib/image';

interface AvatarUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (file: File) => Promise<void>;
  currentAvatar: string | null;
}
export function AvatarUpload({
  open,
  onOpenChange,
  onSubmit,
  currentAvatar,
}: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };

    reader.readAsDataURL(file);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      await onSubmit(selectedFile);
      clearSelection();
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating avarar:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update profile picture</DialogTitle>
        </DialogHeader>
        {!preview ? (
          <div className="space-y-4">
            {currentAvatar && (
              <div className="flex justify-center">
                <Image
                  src={getImageUrl(currentAvatar)}
                  alt="Current avarar"
                  width={64}
                  height={64}
                  className="w-24 h-24 rounded-full object-cover border-2 border-muted"
                />
              </div>
            )}
            <FileUploadAria onFileSelect={handleFileSelect} />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover border-2 border-primary"
                  width={64}
                  height={64}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute -top-2 -right-2 bg-black/50 text-white hover:bg-black/70 rounded-full p-2"
                  onClick={clearSelection}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={clearSelection}
                disabled={isUploading}
              >
                Back
              </Button>
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Update avatar'}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
