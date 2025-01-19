import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import { CloudinaryConfig } from "../../../../../Cloudinary";

export function ImageUpload({
  images,
  setImages,
  multiple = false,
  maxFiles = 5,
  title = "Upload Image",
  description = "Drag 'n' drop some files here, or click to select files",
}) {
  const [previews, setPreviews] = useState([]);

  // Create object URLs for new file uploads
  useEffect(() => {
    if (!images) return;

    const createPreviews = () => {
      if (multiple && Array.isArray(images)) {
        return images.map(image => {
          // If image is a File, create object URL
          if (image instanceof File) {
            return URL.createObjectURL(image);
          }
          // If image has url property, it's from Cloudinary
          return image.url ? `${CloudinaryConfig.CLOUDINARY_URL}/image/upload/c_fill,w_400,h_400,q_auto,f_auto/${image.url}` : null;
        });
      } else if (!multiple && images) {
        // Single image case
        if (images instanceof File) {
          return [URL.createObjectURL(images)];
        }
        return images.url ? [`${CloudinaryConfig.CLOUDINARY_URL}/image/upload/c_fill,w_400,h_400,q_auto,f_auto/${images.url}`] : [];
      }
      return [];
    };

    const newPreviews = createPreviews();
    setPreviews(newPreviews);

    // Cleanup function to revoke object URLs
    return () => {
      if (multiple && Array.isArray(images)) {
        images.forEach(image => {
          if (image instanceof File) {
            URL.revokeObjectURL(image);
          }
        });
      } else if (!multiple && images instanceof File) {
        URL.revokeObjectURL(images);
      }
    };
  }, [images, multiple]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (multiple) {
        setImages(acceptedFiles);
      } else {
        setImages(acceptedFiles[0]);
      }
    },
    [setImages, multiple]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: multiple,
    maxFiles: multiple ? maxFiles : 1,
  });

  const removeImage = (index) => {
    if (multiple) {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    } else {
      setImages(null);
    }
  };

  const renderImages = () => {
    return previews.map((preview, index) => (
      <div key={v4()} className="relative group">
        <img
          src={preview}
          alt={`Upload ${index + 1}`}
          className={`w-full ${multiple ? 'h-32' : 'h-64'} object-cover rounded-md`}
        />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => removeImage(index)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    ));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-4 sm:p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-muted-foreground hover:border-primary"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-sm sm:text-base">
          {isDragActive
            ? "Drop the files here ..."
            : "Drag 'n' drop some files here, or click to select files"}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Supported formats: JPEG, JPG, PNG, GIF
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {renderImages()}
      </div>
    </div>
  );
}

ImageUpload.propTypes = {
  images: PropTypes.oneOfType([
    PropTypes.instanceOf(File),
    PropTypes.shape({
      url: PropTypes.string
    }),
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.instanceOf(File),
      PropTypes.shape({
        url: PropTypes.string
      })
    ])),
  ]),
  setImages: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  maxFiles: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
};