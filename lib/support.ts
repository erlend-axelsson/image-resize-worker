const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

export const calcDimension = (
  maxAllowed: { width: number, height: number },
  actual: { width: number, height: number }
): { width: number, height: number } => {
  const max = {
    width: Math.min(maxAllowed.width <= 0 ? actual.width : maxAllowed.width, actual.width),
    height: Math.min(maxAllowed.height <= 0 ? actual.height : maxAllowed.height, actual.height)
  }
  const widthRatio = max.width / actual.width
  const heightRatio = max.height / actual.height
  return widthRatio < heightRatio
    ? {width: max.width, height: widthRatio * actual.height}
    : {width: heightRatio * actual.width, height: max.height}
}
export const inferOpts = (f: File, opts: ResizeOpts | undefined): Required<ResizeOpts> => {
  return {
    name: opts?.name ? opts.name : f.name,
    imageType: opts?.imageType ? opts.imageType : f.type,
    maxWidth: opts?.maxWidth ? opts.maxWidth : -1,
    maxHeight: opts?.maxHeight ? opts.maxHeight : -1,
    resizeQuality: opts?.resizeQuality ? opts.resizeQuality : "high",
    exportQuality: opts?.exportQuality ? opts.exportQuality : 0.9
  }
}

export const randString = (len = 16) => {
  const randBuffer = new Array(len)
  for(let i = 0; i < randBuffer.length; i++) {
    randBuffer[i] = CHARS[Math.floor((Math.random()*(CHARS.length-1))+1)]
  }
  return randBuffer.join("")
}