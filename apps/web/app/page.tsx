"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

import { Stories } from "@/components/dashbord/stories";
import Feed from "@/components/dashbord/feed";
import Sidebar from "@/components/dashbord/sidebar";
import { PhotoUpload } from "@/components/dashbord/photo-upload";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const handleCreatePost = async (file: File, caption: string) => {};

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Stories />
            <Feed />
          </div>
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <Sidebar />
          </div>
        </div>
      </div>

      <PhotoUpload
        open={showUploadModal}
        onOpenChange={setShowUploadModal}
        onSubmit={handleCreatePost}
      />

      <Button
        onClick={() => setShowUploadModal(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
