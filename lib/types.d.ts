type ResizeMessage = {
  image: File,
  name: string | undefined
  callbackId: string
  opts?: ResizeOpts
}
type ResizeResponse = {
  image: File
  callbackId: string
}

type ResizeOpts = {
  name?: string
  imageType?: string
  maxWidth?: number
  maxHeight?: number
  resizeQuality?: "high" | "low" | "medium" | "pixelated"
  exportQuality?: number
}