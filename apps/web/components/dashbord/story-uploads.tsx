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

interface StoryUploadsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (file: File) => Promise<void>;
}

export function StoryUpload({
  open,
  onOpenChange,
  onSubmit,
}: StoryUploadsProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();

    reader.onload = (e) => setPreview(e.target?.result as string);

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
      console.error('Error creating post:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add your story</DialogTitle>
          {!preview ? (
            <FileUploadAria onFileSelect={handleFileSelect} />
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src={preview}
                  alt="Preview"
                  height={64}
                  width={64}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSelection}
                  className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                >
                  <X className="w-4 h-4" />
                </Button>
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
                  Share story
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
