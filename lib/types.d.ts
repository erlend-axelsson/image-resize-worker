export type ResizeMessage = {
  image: File,
  name: string | undefined
  callbackId: string
  opts?: ResizeOpts
}
export type ResizeResponse = {
  image: File
  callbackId: string
}

export type ResizeOpts = {
  name?: string
  imageType?: string
  maxWidth?: number
  maxHeight?: number
  resizeQuality?: "high" | "low" | "medium" | "pixelated"
  exportQuality?: number
}