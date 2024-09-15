## image-resize-worker

Uses OffscreenCanvas in a worker to resize images, can be used to convert between (some) formats.

### usage
#### install
`````shell
npm install image-resize-worker
``````
#### functions and types
````typescript
type Resize = {
  resizeImage(f: File, opts?: ResizeOpts): Promise<File>
  resizeImageCallback(f: File, cb: (f: File) => any, opts?: ResizeOpts): void
}
type ResizeOpts = {
  name?: string // filename, defaults to input filename
  imageType?: string // mime type (image/jpeg, image/png etc) defaults to input type.
  // Used to convert between formats
  maxWidth?: number // with values < 1 it defaults to the input image's width and height
  maxHeight?: number
  resizeQuality?: "high" | "low" | "medium" | "pixelated" // defaults to high
  exportQuality?: number // quality for lossy formats like jpg. Range 0 <-> 1, defaults to 0.9
}
````




### dev

#### setup
````shell
npm install
````

#### running tests
````shell
npm test
````

#### running local dev server (with demo frontend)
````shell
npm dev
````

#### build
````shell
npm build
````