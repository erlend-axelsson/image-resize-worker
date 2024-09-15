export type ResizeOpts = {
  name?: string
  imageType?: string
  maxWidth?: number
  maxHeight?: number
  resizeQuality?: "high" | "low" | "medium" | "pixelated"
  exportQuality?: number
}

const worker =
  new Worker(new URL("./worker.ts", import.meta.url), {
  type: 'module'
})


const callbacks = new Map<string, (blob: File) => void>()

worker.onmessage = async (e: MessageEvent<ResizeResponse>) => {
  try{
    const cb = callbacks.get(e.data.callbackId)!
    cb(e.data.image)
  } catch (e) {
    console.error(e)
  } finally {
      callbacks.delete(e.data.callbackId)
  }
}

export const resizeImage = async (f: File, opts?: ResizeOpts) => {
  return await new Promise<File>(resolve => requestResize(f, resolve, opts))
}

export const resizeImageCallback = (f: File, cb: (f: File) => any, opts?: ResizeOpts): void => {
  requestResize(f, cb, opts).finally()
}

const requestResize = async (file: File, cb: ((blob: File) => void), opts?: ResizeOpts) => {
  const buffer = await file.arrayBuffer()
  const callbackId: string = crypto.randomUUID()
  callbacks.set(callbackId, cb)

  const message : ResizeMessage = opts?
    { image: file, name: file.name, callbackId: callbackId, opts: opts } :
    { image: file, name: file.name, callbackId: callbackId }
  worker.postMessage(message, [buffer])
}
