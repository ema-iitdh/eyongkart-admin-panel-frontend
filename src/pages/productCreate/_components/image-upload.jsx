import { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

export function ImageUpload({ images, setImages }) {
  const onDrop = useCallback((acceptedFiles) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles])
  }, [setImages])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
  })

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-green-500 rounded-md p-4 sm:p-8 text-center cursor-pointer ${
          isDragActive ? 'bg-slate-100' : ''
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-sm sm:text-base text-green-500">Drop the files here ...</p>
        ) : (
          <p className="text-sm sm:text-base text-green-500">Drag and drop some files here, or click to select files</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={`Uploaded ${index + 1}`}
              className="w-full h-32 sm:h-40 object-cover rounded-md"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 sm:h-8 sm:w-8"
              onClick={() => removeImage(index)}
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

ImageUpload.propTypes = {
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired,
}

