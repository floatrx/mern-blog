import { Trash2 } from 'lucide-react';
import { forwardRef, useRef } from 'react';

import { useUploadMutation } from '@/api/upload';

import { Button } from '@/components/ui/button/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/form/input';

interface IProps {
  value?: string;
  name: string;
  onChange?: (src: string) => void;
}

type TUpload = React.ForwardRefExoticComponent<IProps & React.RefAttributes<HTMLInputElement>>;

export const Upload: TUpload = forwardRef(({ onChange, value, ...props }, ref) => {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [uploadFile, { isLoading }] = useUploadMutation(); // Upload file

  const handleRemoveThumbnail = () => {
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
      const { location } = await uploadFile(formData).unwrap(); // Upload file
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
          {value && (
            <div>
              <img alt="thumbnail" className="h-48 w-full rounded-xl object-cover" src={value} />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2">
            <Button type="button" variant="outline" loading={isLoading} onClick={() => uploadRef?.current?.click()}>
              {value ? 'Replace' : 'Choose'} {props.name}
            </Button>
            {value && (
              <Button type="button" variant="destructive" size="icon" onClick={handleRemoveThumbnail}>
                <Trash2 size={20} />
              </Button>
            )}
          </div>

          <Input ref={uploadRef} id="upload" type="file" onChange={handleUpload} className="hidden" />
          {/* Pass rest props from FormControl field */}
          <Input readOnly ref={ref} value={value} {...props} className="hidden" />
        </CardTitle>

        {!value && <CardDescription className="truncate">File should be no larger than 2MB</CardDescription>}
      </CardHeader>
    </Card>
  );
});
