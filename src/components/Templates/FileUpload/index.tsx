"use client"

import Button from "@mui/material/Button"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import { useFileUpload } from "./useFileUpload"
import { getJSONDataView } from "@/utils/helper"

export default function FileUpload({ onSuccess = (a: any) => {} }) {
  const {
    handleButtonClick,
    handleFileUpload,
    isUploading,
    fileInputRef,
    uploadedFileData,
  } = useFileUpload({ onSuccess })

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
      {Object.keys(uploadedFileData).length > 0 && getJSONDataView(uploadedFileData)}

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isUploading}
      >
        <CircularProgress color="inherit" sx={{ position: "absolute" }} />
        <h4>Uploading</h4>
      </Backdrop>
    </div>
  )
}
