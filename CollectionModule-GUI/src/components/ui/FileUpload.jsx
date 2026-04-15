import { clsx } from 'clsx'
import { useState } from 'react'
import { X } from 'lucide-react'
import { useNotification } from '../../context/NotificationContext'

/**
 * TagInput Component - Add tags with keyboard and blur handling
 * @param {Object} props
 * @param {string} props.label - Label text
 * @param {Array} props.tags - Array of tag strings
 * @param {Function} props.onTagsChange - Change handler
 * @param {string} props.error - Error message
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.placeholder - Placeholder text
 * @returns {React.ReactElement}
 */
export function TagInput({
  label,
  tags = [],
  onTagsChange,
  error,
  disabled = false,
  placeholder = 'Add a tag and press Enter',
  className,
  id,
}) {
  const [inputValue, setInputValue] = useState('')
  const [focused, setFocused] = useState(false)

  const handleAddTag = (e) => {
    if ((e.key === 'Enter' || e.type === 'blur') && inputValue.trim()) {
      const newTags = [...tags, inputValue.trim()]
      onTagsChange(newTags)
      setInputValue('')
    }
  }

  const handleRemoveTag = (index) => {
    onTagsChange(tags.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag(e)
    }
  }

  return (
    <div className={clsx('form-group', className)}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <div
        className={clsx(
          'flex flex-wrap gap-2 p-2.5 border border-gray-300 rounded-lg bg-white',
          'transition-all duration-200',
          focused
            ? 'ring-2 ring-primary-500 ring-offset-2 border-primary-500'
            : 'hover:border-gray-400',
          disabled && 'bg-gray-100 opacity-50',
          error && 'border-danger-500'
        )}
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            className={clsx(
              'inline-flex items-center gap-1.5 px-3 py-1.5',
              'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700',
              'rounded-full text-sm font-medium',
              'animate-slideUp'
            )}
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(index)}
              disabled={disabled}
              className={clsx(
                'hover:text-primary-900 transition-colors duration-150',
                'focus:outline-none focus:ring-1 focus:ring-primary-500 rounded-full',
                disabled && 'cursor-not-allowed opacity-50'
              )}
              aria-label={`Remove tag: ${tag}`}
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          </span>
        ))}
        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={(e) => {
            handleAddTag(e)
            setFocused(false)
          }}
          onFocus={() => setFocused(true)}
          disabled={disabled}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 outline-none text-sm min-w-[120px] bg-transparent"
          aria-label={label}
        />
      </div>
      {error && (
        <span className="text-danger-600 text-xs mt-1.5 block">
          {error}
        </span>
      )}
    </div>
  )
}

/**
 * FileUpload Component - Drag-and-drop single file upload with validation
 */
export function FileUpload({
  label,
  onFileChange,
  error,
  disabled = false,
  accept = '*',
  maxSize = 10485760, // 10MB
  className,
  id,
}) {
  const [dragActive, setDragActive] = useState(false)
  const [fileInfo, setFileInfo] = useState(null)

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0]

      // Check file size
      if (file.size > maxSize) {
        setFileInfo(null)
        throw new Error(`File size exceeds ${formatFileSize(maxSize)} limit`)
      }

      setFileInfo({
        name: file.name,
        size: formatFileSize(file.size),
      })
      onFileChange?.(file)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    try {
      handleFiles(e.dataTransfer.files)
    } catch (err) {
      setFileInfo(null)
    }
  }

  return (
    <div className={clsx('form-group', className)}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={clsx(
          'relative p-6 sm:p-8 border-2 border-dashed rounded-lg transition-all duration-200',
          'cursor-pointer',
          dragActive
            ? 'border-primary-500 bg-primary-50 shadow-md'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400',
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          error && 'border-danger-500 bg-danger-50'
        )}
      >
        <input
          id={id}
          type="file"
          onChange={(e) => {
            try {
              handleFiles(e.target.files)
            } catch (err) {
              setFileInfo(null)
            }
          }}
          disabled={disabled}
          accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={label}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <div className="text-center">
          <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">📁</div>
          <p className="text-gray-700 font-semibold text-sm sm:text-base">
            Drop file here or click to upload
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Maximum file size: {formatFileSize(maxSize)}
          </p>
        </div>
      </div>
      {fileInfo && (
        <div className="mt-4 p-3 sm:p-4 bg-success-50 border border-success-200 rounded-lg animate-slideUp">
          <p className="text-xs sm:text-sm text-success-700 font-medium">
            ✓ {fileInfo.name} ({fileInfo.size})
          </p>
        </div>
      )}
      {error && (
        <span id={`${id}-error`} className="text-danger-600 text-xs mt-1.5 block">
          {error}
        </span>
      )}
    </div>
  )
}

/**
 * MultiFileUpload Component - Upload multiple files with progress tracking
 */
export function MultiFileUpload({
  label,
  onFilesChange,
  error,
  disabled = false,
  accept = '*',
  maxFiles = 5,
  maxSize = 10485760,
  className,
  id,
}) {
  const { showWarning } = useNotification()
  const [files, setFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleFiles = (newFiles) => {
    const totalFiles = files.length + newFiles.length
    if (totalFiles > maxFiles) {
      showWarning(`Maximum ${maxFiles} files allowed`)
      return
    }

    let validFiles = []
    for (let file of newFiles) {
      if (file.size <= maxSize) {
        validFiles.push(file)
      } else {
        showWarning(`${file.name} exceeds size limit (${formatFileSize(maxSize)})`)
      }
    }

    const updatedFiles = [...files, ...validFiles]
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)
  }

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  return (
    <div className={clsx('form-group', className)}>
      {label && (
        <label htmlFor={`${id}-input`} className="form-label">
          {label}
        </label>
      )}

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={(e) => {
          e.preventDefault()
          setDragActive(false)
          handleFiles(e.dataTransfer.files)
        }}
        className={clsx(
          'p-6 sm:p-8 border-2 border-dashed rounded-lg transition-all duration-200',
          dragActive
            ? 'border-primary-500 bg-primary-50 shadow-md'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400',
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
        )}
      >
        <input
          id={`${id}-input`}
          type="file"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={disabled}
          accept={accept}
          multiple
          className="hidden"
        />
        <label
          htmlFor={`${id}-input`}
          className="cursor-pointer text-center block"
        >
          <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">📁</div>
          <p className="text-gray-700 font-semibold text-sm sm:text-base">
            Upload multiple files
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            {files.length}/{maxFiles} files selected • Max {formatFileSize(maxSize)} per file
          </p>
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-150 animate-slideUp"
            >
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <span className="text-lg flex-shrink-0">📄</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                disabled={disabled}
                className={clsx(
                  'ml-2 p-1.5 text-danger-600 hover:bg-danger-50 rounded transition-colors duration-150',
                  'focus:outline-none focus:ring-2 focus:ring-danger-500 focus:ring-offset-1',
                  disabled && 'cursor-not-allowed opacity-50'
                )}
                aria-label={`Remove file: ${file.name}`}
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <span className="text-danger-600 text-xs mt-1.5 block">
          {error}
        </span>
      )}
    </div>
  )
}
