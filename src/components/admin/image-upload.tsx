'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  className?: string
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const [useUrl, setUseUrl] = useState(!value || value.startsWith('http'))
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    setError('')
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al subir imagen')
      }

      onChange(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir imagen')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUpload(file)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      handleUpload(file)
    } else {
      setError('Por favor, arrastra solo archivos de imagen')
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const clearImage = () => {
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={className}>
      {/* Tabs para elegir método */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setUseUrl(false)}
          className={`px-4 py-2 text-sm rounded-lg transition-all ${
            !useUrl
              ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/50'
              : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
          }`}
        >
          <Upload className="w-4 h-4 inline mr-2" />
          Subir archivo
        </button>
        <button
          type="button"
          onClick={() => setUseUrl(true)}
          className={`px-4 py-2 text-sm rounded-lg transition-all ${
            useUrl
              ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/50'
              : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
          }`}
        >
          <ImageIcon className="w-4 h-4 inline mr-2" />
          URL externa
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {useUrl ? (
        /* Input de URL */
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://ejemplo.com/imagen.jpg"
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#00FF88]/50 focus:ring-[#00FF88]/20"
        />
      ) : (
        /* Zona de drag & drop */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
            ${isDragging
              ? 'border-[#00FF88] bg-[#00FF88]/10'
              : 'border-white/20 hover:border-[#00FF88]/50 hover:bg-white/5'
            }
            ${isUploading ? 'pointer-events-none opacity-50' : ''}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            onChange={handleFileSelect}
            className="hidden"
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-[#00FF88] animate-spin" />
              <span className="text-gray-400">Subiendo imagen...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-gray-300">
                Arrastra una imagen aquí o haz clic para seleccionar
              </span>
              <span className="text-xs text-gray-500">
                JPG, PNG, WEBP o GIF (máx. 10MB)
              </span>
            </div>
          )}
        </div>
      )}

      {/* Preview de imagen */}
      {value && (
        <div className="mt-4 relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="w-32 h-32 object-contain rounded-xl border border-white/20 bg-white/5"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clearImage}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-500 text-white"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}
    </div>
  )
}
