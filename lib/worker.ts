// noinspection SpellCheckingInspection

import {calcDimension, inferOpts, randString} from "./support.ts";

const inferExt = (mime: string | undefined) => {
  if (mime === undefined) {
    return ""
  }
  switch (mime.toLowerCase()) {
    case "image/jpeg":
      return ".jpg"
    case "image/png":
      return ".png"
    case "image/gif":
      return ".gif"
    case "image/bmp":
      return ".bmp"
    case "image/svg+xml":
      return ".svg"
    default:
      return ""
  }
}

self.onmessage = async (e: MessageEvent<ResizeMessage>) => {
  const imageBlob = await resizeImage(e.data.image, e.data.opts)
  const imageBuffer = await imageBlob.arrayBuffer()
  const name = e.data.opts?.name || e.data.name || randString() + inferExt(e.data.opts?.imageType)
  const file = new File([imageBlob], name)
  respond({callbackId: e.data.callbackId, image: file}, [imageBuffer]);
}

const respond = (response: ResizeResponse, transfer: any[]) => {
  self.postMessage(response, transfer);
}

const resizeImage = async (f: File, opts?: ResizeOpts) => {
  const inferredOpts = inferOpts(f, opts)
  return await self.createImageBitmap(f)
    .then(img => {
      const {width, height} = calcDimension({width: inferredOpts.maxWidth, height: inferredOpts.maxHeight}, img)
      return self.createImageBitmap(img, {resizeWidth: width, resizeHeight: height, resizeQuality: opts?.resizeQuality || "high"})
    }).then(resized_img => {
      const offscreen = new OffscreenCanvas(resized_img.width, resized_img.height);
      const ctx = offscreen.getContext("bitmaprenderer")
      ctx?.transferFromImageBitmap(resized_img)
      return offscreen.convertToBlob({type: inferredOpts.imageType, quality: inferredOpts.exportQuality})
    })
}

