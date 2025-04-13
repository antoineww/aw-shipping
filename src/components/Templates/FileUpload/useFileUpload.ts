import { useState, useRef } from "react"

export const useFileUpload = ({ onSuccess = (a: any) => {} }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState("")
  const fileInputRef = useRef(null)

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    setUploadedFileName(file.name)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()

      if (data.message) {
        onSuccess(data)
        console.log({ data })
      }
    } catch (error) {
      console.error("Error uploading file:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef != null) {
      fileInputRef.current.click()
    }
  }

  return {
    handleButtonClick,
    handleFileUpload,
    isUploading,
    fileInputRef,
    uploadedFileName,
  }
}
