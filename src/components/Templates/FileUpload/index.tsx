"use client"

import Button from "@mui/material/Button"
import { useFileUpload } from "./useFileUpload"

export default function FileUpload({ onSuccess = (a: any) => {} }) {

  const {
    handleButtonClick,
    handleFileUpload,
    isUploading,
    fileInputRef,
    uploadedFileName,
  } = useFileUpload({onSuccess})
 
  return (
    <div>
      <Button variant="outlined" onClick={handleButtonClick}>
        Upload CSV
      </Button>
      <input
        type="file"
        className="hidden"
        accept=".csv"
        onChange={handleFileUpload}
        disabled={isUploading}
        ref={fileInputRef}
      />
      <p>{uploadedFileName}</p>
      
    </div>
  )
}
