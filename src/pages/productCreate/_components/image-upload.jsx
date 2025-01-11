import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import { v4 } from "uuid";

export function ImageUpload({
	images,
	setImages,
	multiple = false,
	maxFiles = 5,
	title = "Upload Image",
	description = "Drag 'n' drop some files here, or click to select files",
}) {
	const onDrop = useCallback(
		(acceptedFiles) => {
			console.log(acceptedFiles, "acceptedFiles");
			if (multiple) {
				// [file1.png, file2.png]
				// acceptedFiles = [File]
				setImages(acceptedFiles);
				console.log(images);
			} else {
				setImages(acceptedFiles[0]);
				console.log(images);
			}
		},
		[setImages, multiple, images, maxFiles],
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
		if (multiple && Array.isArray(images)) {
			return images.map((file, index) => (
				<div key={v4()} className="relative group">
					<img
						src={URL.createObjectURL(file)}
						alt={`Uploaded ${index + 1}`}
						className="w-full h-32 object-cover rounded-md"
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
		}
		if (!multiple && images) {
			return (
				<div className="relative group">
					<img
						src={URL.createObjectURL(images)}
						// biome-ignore lint/a11y/noRedundantAlt: <explanation>
						alt="Uploaded image"
						className="w-full h-64 object-cover rounded-md"
					/>

					<Button
						type="button"
						variant="destructive"
						size="icon"
						className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
						onClick={() => removeImage()}
					>
						<X className="h-4 w-4" />
					</Button>
				</div>
			);
		}
		return null;
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
		PropTypes.arrayOf(PropTypes.instanceOf(File)),
	]),
	setImages: PropTypes.func.isRequired,
	multiple: PropTypes.bool,
	maxFiles: PropTypes.number,
	title: PropTypes.string,
	description: PropTypes.string,
};
