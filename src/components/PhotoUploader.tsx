
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface PhotoUploaderProps {
  onPhotosProcessed: (photos: { id: string; file: File; preview: string; corrected: string }[]) => void;
}

const PhotoUploader = ({ onPhotosProcessed }: PhotoUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const processImage = (file: File): Promise<{ id: string; file: File; preview: string; corrected: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const img = new Image();
          img.onload = () => {
            // Create a canvas to process the image
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              return;
            }

            // Draw the image to the canvas with a correction (simulated rotation)
            ctx.translate(canvas.width / 2, canvas.height / 2);
            
            // Simulate random orientation fix (0, 90, 180, or 270 degrees)
            const rotations = [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2];
            const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
            ctx.rotate(randomRotation);
            
            ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
            
            // Convert canvas to base64 data URL
            const correctedDataUrl = canvas.toDataURL('image/jpeg');
            
            // Resolve with the processed image data
            resolve({
              id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
              file,
              preview: URL.createObjectURL(file),
              corrected: correctedDataUrl
            });
          };
          img.src = event.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setIsProcessing(true);
      
      const uploadedFiles = Array.from(e.dataTransfer.files).filter(
        file => file.type.startsWith('image/')
      );
      
      if (uploadedFiles.length === 0) {
        toast({
          title: "Invalid Files",
          description: "Please upload image files only (JPEG, PNG, etc.).",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
      
      try {
        const processedPhotos = await Promise.all(uploadedFiles.map(processImage));
        onPhotosProcessed(processedPhotos);
      } catch (error) {
        console.error('Error processing images:', error);
        toast({
          title: "Processing Error",
          description: "There was an error processing your images.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    }
  }, [onPhotosProcessed, toast]);

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsProcessing(true);
      
      const uploadedFiles = Array.from(e.target.files).filter(
        file => file.type.startsWith('image/')
      );
      
      if (uploadedFiles.length === 0) {
        toast({
          title: "Invalid Files",
          description: "Please upload image files only (JPEG, PNG, etc.).",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
      
      try {
        const processedPhotos = await Promise.all(uploadedFiles.map(processImage));
        onPhotosProcessed(processedPhotos);
      } catch (error) {
        console.error('Error processing images:', error);
        toast({
          title: "Processing Error",
          description: "There was an error processing your images.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
        // Reset the file input
        e.target.value = '';
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">Upload Your eBay Photos</h2>
        <p className="text-gray-600 mt-1">
          Upload the photos you want to fix orientation for
        </p>
      </div>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging 
            ? 'border-ebay-primary bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isProcessing ? (
          <div className="py-8">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ebay-primary"></div>
            </div>
            <p className="mt-4 text-gray-600">Processing your photos...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <p className="text-gray-600">Drag and drop your photos here, or</p>
            <div className="mt-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleFileInputChange}
                />
                <Button 
                  type="button"
                  variant="outline" 
                  className="border-ebay-primary text-ebay-primary hover:bg-ebay-primary hover:text-white"
                >
                  Select Files
                </Button>
              </label>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Supported formats: JPEG, PNG, GIF
            </p>
          </>
        )}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-medium text-gray-700">How it works:</h3>
        <ol className="mt-2 text-sm text-gray-600 list-decimal ml-5 space-y-1">
          <li>Upload your eBay listing photos</li>
          <li>Our system automatically detects and corrects photo orientation</li>
          <li>Preview the corrected photos before updating your listings</li>
          <li>Apply the fixes to your selected eBay listings</li>
        </ol>
      </div>
    </div>
  );
};

export default PhotoUploader;
