import { Button } from '@/components/ui/button/Button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/form/Input';
import { Label } from '@/components/ui/form/Label';
import { Trash2 } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { useUploadMutation } from '@/api/upload';

interface IProps {
  value?: string;
  name: string;
  onChange?: (src: string) => void;
}

type TUpload = React.ForwardRefExoticComponent<IProps & React.RefAttributes<HTMLInputElement>>;

export const Upload: TUpload = forwardRef(({ onChange, ...props }, ref) => {
  const [uploadFile, { isLoading }] = useUploadMutation(); // Upload file

  const [thumbnail, setThumbnail] = useState<string | undefined>(props.value);

  const handleRemoveThumbnail = () => {
    setThumbnail('');
    onChange?.('');
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file from the list

    if (!file) {
      console.error('No file selected.');
      return;
    }

    const maxFileSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxFileSize) return;

    // Prepare form data for file upload
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Upload file
      const { location } = await uploadFile(formData).unwrap();
      setThumbnail(location);
      onChange?.(location); // Pass the file location to the parent component
    } catch (e) {
      console.error('Error uploading file:', e.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-5">
          {/* Thumbnail */}
          {thumbnail && (
            <div>
              <img alt="thumbnail" className="h-32 w-full rounded-xl object-cover" src={thumbnail} />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2">
            <Button type="button" variant="outline" loading={isLoading}>
              <Label htmlFor="file">{thumbnail ? 'Replace thumbnail' : 'Choose file'}</Label>
            </Button>
            <Button type="button" variant="outline" size="icon" onClick={handleRemoveThumbnail}>
              <Trash2 size={20} />
            </Button>
          </div>

          {/* File trigger */}
          <Input id="file" type="file" onChange={handleUpload} className="hidden" />

          {/* Pass rest props from FormControl field */}
          <Input readOnly ref={ref} {...props} className="hidden" />
        </CardTitle>

        {!thumbnail && <CardDescription className="truncate">File should be no larger than 2MB</CardDescription>}
      </CardHeader>
    </Card>
  );
});