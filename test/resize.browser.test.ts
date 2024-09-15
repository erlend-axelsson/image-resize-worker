import {describe, it} from "vitest";
import * as resize from "../lib/resize"
// @ts-ignore
import testImage from "./test_assets/test_checkerboard.png?url"
const imageData = await fetch((new URL(testImage, import.meta.url))).then(r=>r.blob())


/**
 * Due to workers dealing with transferable objects we need to either read the file from disk for each test
 * or make copies of the arraybuffer
 * */
const copyImageBuffer = async() => {
  const buf = await imageData.arrayBuffer()
  const dst = new ArrayBuffer(buf.byteLength);
  new Uint8Array(dst).set(new Uint8Array(buf));
  return dst
}

const JPEG_MAGIC_START = [0xFF, 0xD8] as const
const JPEG_MAGIC_END = [0xFF, 0xD9] as const

describe('resize', () => {
  it("resize image with callback", async ({ expect }) => {
    const imageBuffer = await copyImageBuffer()
    const blob = new Blob([imageBuffer])
    const file = new File([blob], "checkerboard.png")
    let retFile : File = await new Promise(resolve =>
      resize.resizeImageCallback(file, resolve, {maxHeight: 100, name: "polka_dots.png"})
    )
    const bitmap = await createImageBitmap(retFile)
    expect(retFile.name).toBe("polka_dots.png")
    expect(bitmap.width).toBe(200)
    expect(bitmap.height).toBe(100)
  })
  it("resize image with await", async ({ expect }) => {
    const imageBuffer = await copyImageBuffer()
    const blob = new Blob([imageBuffer])
    const file = new File([blob], "checkerboard.png")
    let retFile : File = await resize.resizeImage(file, {maxHeight: 50})
    const bitmap = await createImageBitmap(retFile)
    expect(retFile.name).toBe("checkerboard.png")
    expect(bitmap.width).toBe(100)
    expect(bitmap.height).toBe(50)
  })
  it("covert to jpg", async ({ expect }) => {
    const imageBuffer = await copyImageBuffer()
    const blob = new Blob([imageBuffer])
    const file = new File([blob], "checkerboard.png")
    let retFile : File = await resize.resizeImage(file, {maxHeight: 50, imageType: "image/jpeg", name: "checkerboard.jpg"})
    const bitmap = await createImageBitmap(retFile)
    const u8arr = new Uint8Array(await retFile.arrayBuffer())

    expect(u8arr.at(0)).toBe(JPEG_MAGIC_START.at(0))
    expect(u8arr.at(1)).toBe(JPEG_MAGIC_START.at(1))
    expect(u8arr.at(-2)).toBe(JPEG_MAGIC_END[0])
    expect(u8arr.at(-1)).toBe(JPEG_MAGIC_END[1])
    expect(retFile.name).toBe("checkerboard.jpg")
    expect(bitmap.width).toBe(100)
    expect(bitmap.height).toBe(50)
  })
})