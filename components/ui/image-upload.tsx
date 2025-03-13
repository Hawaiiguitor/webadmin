"use client"

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string[]) => void;
    onRemove: (value: string) => void;
    onMarkFirst?: (value: string[]) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    onMarkFirst,
    value
}) => {

    const [isMounted, setIsMounted] = useState(false);
    console.log("**************", value.length)
    useEffect(() => {
        setIsMounted(true);
    }, [])
    
    const onUpload = (result: any) => {
        // console.log('Uploaded images:', result);
        onChange(result.info.secure_url);
        const newValue = [...value, result.info.secure_url]
    }

    const markAsFirst = (url: string) => {
        const newValue = [url, ...value.filter(imageUrl => imageUrl !== url)];
        if (onMarkFirst) {
            onMarkFirst(newValue);
        }
    }

    if (!isMounted) {
        return null;
    }


    return (
        <div>
            <div className='mb-4 flex items-center gap-4 flex-wrap'>
                {value.map((url) => (
                    <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
                        <div className='z-10 absolute top-2 right-2 flex gap-2'>
                            <Button type='button' onClick={() => onRemove(url)} variant="destructive" size="icon">
                                <Trash className='w-4 h-4'/>
                            </Button>
                            <Button type='button' onClick={() => markAsFirst(url)} variant="secondary" size="icon">
                                Mark
                            </Button>
                        </div>
                        <Image fill className='object-cover' alt='Image' src={url} sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                ))}
            </div>
            <CldUploadWidget onSuccess={onUpload} 
                uploadPreset='dev_yanb'
                options={{
                multiple: true, // Enable multiple uploads
                maxFiles: 7,   // Optional: set maximum files allowed
              }}>
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }

                    return (
                        <Button type='button' disabled={disabled} variant={'secondary'} onClick={onClick}>
                            <ImagePlus className='h-4 w-4 mr-2' />
                            Upload Images
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
};

export default ImageUpload