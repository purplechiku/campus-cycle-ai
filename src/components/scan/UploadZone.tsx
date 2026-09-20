import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function UploadZone({ onFileSelect, disabled }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) return;
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const clearPreview = () => {
    setPreview(null);
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleAnalyze = () => {
    if (selectedFile) onFileSelect(selectedFile);
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <motion.div
        className={cn(
          'relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300',
          isDragging
            ? 'border-teal-400 bg-teal-500/10'
            : preview
            ? 'border-slate-600 bg-slate-800/40'
            : 'border-slate-600 bg-slate-800/30 hover:border-teal-500/60 hover:bg-slate-800/50',
          disabled && 'cursor-not-allowed opacity-60'
        )}
        onClick={() => !disabled && !preview && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload an image of the item to analyze"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
        animate={isDragging ? { scale: 1.02 } : { scale: 1 }}
      >
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full h-full"
            >
              <img
                src={preview}
                alt="Selected item preview"
                className="h-48 w-full rounded-xl object-contain p-2"
              />
              {!disabled && (
                <button
                  onClick={(e) => { e.stopPropagation(); clearPreview(); }}
                  className="absolute right-2 top-2 rounded-full bg-slate-700 p-1.5 text-slate-300 hover:bg-slate-600"
                  aria-label="Remove selected image"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 p-8 text-center"
            >
              <div className={cn(
                'flex h-16 w-16 items-center justify-center rounded-2xl transition-colors',
                isDragging ? 'bg-teal-500/20' : 'bg-slate-700/60'
              )}>
                <Upload className={cn('h-7 w-7', isDragging ? 'text-teal-400' : 'text-slate-500')} aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-slate-200 text-sm">
                  Drop your image here
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  or tap to browse · PNG, JPG, WEBP
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleChange}
          aria-hidden="true"
          tabIndex={-1}
        />
      </motion.div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <Button
          variant="secondary"
          className="flex-1 gap-2"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          aria-label="Choose image from gallery"
        >
          <ImageIcon className="h-4 w-4" aria-hidden="true" />
          Gallery
        </Button>
        <Button
          variant="secondary"
          className="flex-1 gap-2"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          aria-label="Take a photo with camera"
        >
          <Camera className="h-4 w-4" aria-hidden="true" />
          Camera
        </Button>
        <Button
          variant="primary"
          className="flex-1 gap-2"
          onClick={handleAnalyze}
          disabled={disabled || !selectedFile}
          aria-label="Analyze the selected item"
        >
          Analyze
        </Button>
      </div>
    </div>
  );
}
