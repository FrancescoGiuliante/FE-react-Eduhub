import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface UploadFileProps {
    classId: number;
    onFileUploaded: () => void;
}

const UploadFile = ({ classId, onFileUploaded }: UploadFileProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const { user, token } = useAuth();
    const { toast } = useToast();

    const VITE_STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

    const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files?.length) {
            setFile(files[0]);
        }
    };

    const handleFileUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            if (user && user.id) {
                formData.append("userId", user.id.toString());
            }

            formData.append("classId", classId.toString());

            console.log(...formData);

            setUploading(true);

            try {
                const response = await fetch(`${VITE_STORAGE_URL}/files/upload`, {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to upload file");
                }

                const data = await response.json();
                console.log(data);
                setFile(null);
                onFileUploaded();
                toast({
                    title: "File uploaded successfully",
                    description: `${file.name} has been uploaded.`,
                });
            } catch (error) {
                console.error("Error uploading file:", error);
                toast({
                    title: "Error uploading file",
                    description: "Please try again later.",
                    variant: "destructive",
                });
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <div className="space-y-4">
            <Input
                type="file"
                onChange={handleInputFileChange}
                accept="*/*"
            />
            <Button onClick={handleFileUpload} disabled={!file || uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </Button>
        </div>
    );
};

export default UploadFile;

