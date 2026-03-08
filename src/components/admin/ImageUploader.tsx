import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Link as LinkIcon, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

const ImageUploader = ({ value, onChange, label = "Image" }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<"upload" | "url">(value && !value.includes("admin-uploads") ? "url" : "upload");
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage.from("admin-uploads").upload(path, file);

    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("admin-uploads").getPublicUrl(path);
    onChange(urlData.publicUrl);
    setUploading(false);
  };

  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-1 block">{label}</label>
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${mode === "upload" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}
        >
          <Upload className="w-3 h-3 inline mr-1" /> Upload
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${mode === "url" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}
        >
          <LinkIcon className="w-3 h-3 inline mr-1" /> URL
        </button>
      </div>

      {mode === "upload" ? (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-border file:bg-muted file:text-foreground file:text-xs file:font-medium"
          />
          {uploading && <p className="text-xs text-muted-foreground mt-1">Uploading...</p>}
        </div>
      ) : (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      )}

      {value && (
        <div className="mt-2 relative inline-block">
          <img src={value} alt="Preview" className="h-20 rounded-lg border border-border object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
