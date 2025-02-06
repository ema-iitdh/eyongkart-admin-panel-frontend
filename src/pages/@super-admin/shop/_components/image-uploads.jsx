import React, { useCallback, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Trash2, Upload } from 'lucide-react'

export function ImageUpload({
  value,
  onChange,
  disabled,
  title = "Upload Image",
  description = "Upload an image file",
  accept = "image/*",
  maxSize = 5 * 1024 * 1024,
  className = "",
  id = "image-upload"
}) {
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!value) {
      setPreview(null)
      return
    }

    if (typeof value === 'string') {
      setPreview(value)
    } else if (value instanceof File) {
      const url = URL.createObjectURL(value)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [value])

  const handleChange = useCallback((e) => {
    const file = e.target.files?.[0]
    setError("")

    if (!file) {
      return
    }

    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / (1024 * 1024)}MB`)
      return
    }

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    console.log(`${title} file selected:`, file)
    onChange?.(file)
  }, [maxSize, onChange, title])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    const file = e.dataTransfer?.files?.[0]
    if (file) {
      handleChange({ target: { files: [file] } })
    }
  }, [handleChange])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
  }, [])

  const handleRemove = useCallback(() => {
    setPreview(null)
    setError("")
    onChange?.(null)
  }, [onChange])

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="relative">
          {preview ? (
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <img 
                src={preview} 
                alt={`Preview of ${title}`}
                className="object-cover w-full h-full"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleRemove}
                disabled={disabled}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label 
              htmlFor={id}
              className="flex flex-col items-center justify-center w-full aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer bg-gray-50"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="h-8 w-8 mb-2 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">{title}</span>
                </p>
                <p className="text-xs text-gray-500">{description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  PNG, JPG or WebP (Max {maxSize / (1024 * 1024)}MB)
                </p>
                {error && (
                  <p className="text-sm text-red-500 mt-2">{error}</p>
                )}
              </div>
              <input
                id={id}
                type="file"
                className="hidden"
                accept={accept}
                onChange={handleChange}
                disabled={disabled}
              />
            </label>
          )}
        </div>
      </CardContent>
    </Card>
  )
}