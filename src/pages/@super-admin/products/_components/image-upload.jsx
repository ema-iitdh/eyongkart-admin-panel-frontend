import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import PropTypes from "prop-types"
import { v4 } from "uuid"

export function ImageUpload({
  images,
  setImages,
  multiple = false,
  maxFiles = 5,
  title = "Upload Image",
  description = "Drag 'n' drop some files here, or click to select files",
}) {
  const [previews, setPreviews] = useState([])

  // Handle preview creation and cleanup
  useEffect(() => {
    if (!images) {
      setPreviews([])
      return
    }

    const createPreviews = () => {
      if (multiple && Array.isArray(images)) {
        return images.map((image) => URL.createObjectURL(image))
      } else if (!multiple && images) {
        return [URL.createObjectURL(images)]
      }
      return []
    }

    // Revoke old preview URLs
    previews.forEach((preview) => URL.revokeObjectURL(preview))
    
    const newPreviews = createPreviews()
    setPreviews(newPreviews)

    return () => {
      newPreviews.forEach((preview) => URL.revokeObjectURL(preview))
    }
  }, [images, multiple])

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (multiple) {
        setImages(acceptedFiles)  // Pass the entire acceptedFiles array
      } else {
        setImages(acceptedFiles[0])
      }
    },
    [setImages, multiple]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: multiple,
    maxFiles: multiple ? maxFiles : 1,
  })

  const removeImage = (index) => {
    if (multiple) {
      URL.revokeObjectURL(previews[index])
      setImages((prevImages) => {
        if (!Array.isArray(prevImages)) return []
        return prevImages.filter((_, i) => i !== index)
      })
    } else {
      if (previews.length > 0) {
        URL.revokeObjectURL(previews[0])
      }
      setImages(null)
    }
  }

  const renderImages = () => {
    return previews.map((preview, index) => (
      <div key={`${preview}-${index}`} className="relative group">
        <img
          src={preview || "/placeholder.svg"}
          alt={`Upload ${index + 1}`}
          className={`w-full ${multiple ? "h-32" : "h-64"} object-cover rounded-md`}
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
    ))
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-4 sm:p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground hover:border-primary"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-sm sm:text-base">
          {isDragActive ? "Drop the files here ..." : "Drag 'n' drop some files here, or click to select files"}
        </p>
        <p className="text-xs text-muted-foreground mt-2">Supported formats: JPEG, JPG, PNG, GIF</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">{renderImages()}</div>
    </div>
  )
}

ImageUpload.propTypes = {
  images: PropTypes.oneOfType([PropTypes.instanceOf(File), PropTypes.arrayOf(PropTypes.instanceOf(File))]),
  setImages: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  maxFiles: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
}