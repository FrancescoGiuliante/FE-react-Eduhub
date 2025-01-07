import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Loader2, Trash } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import IFile from '@/interfaces/File';
import UploadFile from './UploadFile';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { Toaster } from '../ui/toaster';
import ConfirmDialog from '../common/ConfirmDialog';

interface FileListProps {
  classId: number;
}

export function FileList({ classId }: FileListProps) {
  const VITE_STORAGE_URL = import.meta.env.VITE_STORAGE_URL;
  const [files, setFiles] = useState<IFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuth();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);

  const fetchFiles = async () => {
    try {
      const response = await fetch(`${VITE_STORAGE_URL}/files/class/${classId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch files: ${response.statusText}`);
      }

      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.log(error);
      
      // console.error('Error fetching files:', error);
      // if (!(error instanceof Error) || error.message !== 'Failed to fetch files: OK') {
      //   toast({
      //     title: "Error fetching files",
      //     description: "Please try again later.",
      //     variant: "destructive",
      //   });
      // }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [classId]);

  const handleDownload = async (fileId: number, filename: string) => {
    try {
      const response = await fetch(`${VITE_STORAGE_URL}/files/${user?.id}/${filename}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to download file');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: "File downloaded successfully",
        description: `${filename} has been downloaded.`,
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Error downloading file",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (filename: string) => {
    setFileToDelete(filename);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (fileToDelete) {
      try {
        const response = await fetch(`${VITE_STORAGE_URL}/files/${fileToDelete}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete file');
        }

        toast({
          title: "File deleted successfully",
          description: `${fileToDelete} has been deleted.`,
        });

        setFiles((prevFiles) => prevFiles.filter((file) => file.filename !== fileToDelete));

      } catch (error) {
        console.error('Error deleting file:', error);
        toast({
          title: "Error deleting file",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    }
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <CardTitle>Class Materials</CardTitle>
        {(user?.role === 'ADMIN' || user?.role === 'PROFESSOR') && (
          <UploadFile classId={classId} onFileUploaded={fetchFiles} />
        )}
      </CardHeader>
      <CardContent>
        {files.length === 0 ? (
          <p className="text-sm text-muted-foreground">No files have been uploaded for this class yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left">Filename</th>
                  <th className="py-2 px-4 text-left">Uploaded By</th>
                  <th className="py-2 px-4 text-left">Upload Date</th>
                  <th className="py-2 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id}>
                    <td className="py-2 px-4">{file.filename}</td>
                    <td className="py-2 px-4">{file.user.name} {file.user.lastName}</td>
                    <td className="py-2 px-4">{new Date(file.createdAt).toLocaleDateString()}</td>
                    <td className="py-2 px-4">
                      <Button
                        onClick={() => handleDownload(file.id, file.filename)}
                        variant="link"
                        className="text-blue-400 hover:underline"
                      >
                        <Download />
                      </Button>
                      {(user?.role === 'ADMIN' || user?.role === 'PROFESSOR') && (
                        <Button
                          onClick={() => handleDelete(file.filename)}
                          variant="link"
                          className="text-red-400 hover:underline ml-2"
                        >
                          <Trash />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
      <Toaster />
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </Card>
  );
}


