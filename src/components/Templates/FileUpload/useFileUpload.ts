import { UploadResponse } from "@/app/api/upload/route"
import { getElapsedTime } from "@/utils/helper"
import { useState, useRef } from "react"

export const useFileUpload = ({ onSuccess = (a: any) => {} }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFileData, setuploadedFileData] = useState({})
  const fileInputRef = useRef(null)

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const startTime = performance.now()
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    setuploadedFileData({ name: file.name })

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data: UploadResponse = await response.json()
      data.filename = file.name
      const endTime = performance.now()
      data.elapsedTime = getElapsedTime(startTime, endTime)

      setuploadedFileData(data)
      onSuccess(data)
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
    uploadedFileData,
  }
}
