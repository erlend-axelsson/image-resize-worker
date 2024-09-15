// noinspection JSUnusedGlobalSymbols

import * as resize from "./resize.ts";
import {ResizeOpts} from "./types";

export type Resize = {
  resizeImage(f: File, opts?: ResizeOpts): Promise<File>
  resizeImageCallback(f: File, cb: (f: File) => any, opts?: ResizeOpts): void
}
export const resizeImage = resize.resizeImage
export const resizeImageCallback = resize.resizeImageCallback
export default resize as Resize
