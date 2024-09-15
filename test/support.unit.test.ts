import * as support from "../lib/support"
import {describe, it} from "vitest";
import type {ResizeOpts} from "../lib/resize";

const re = (len: number) => RegExp(`^[A-Za-z0-9]{${len}}$`)

describe.concurrent('support functions', () => {
  it('randString', async ({ expect }) => {
    expect(support.randString()).toMatch(re(16))
    expect(support.randString(10)).toMatch(re(10))
  })
  it('resize', async ({ expect }) => {
    expect(
      support.calcDimension({width: 100, height: 100}, {width: 200, height: 400})
    ).toMatchObject({width: 50, height: 100})
    expect(
      support.calcDimension({width: 100, height: 100}, {width: 75, height: 50})
    ).toMatchObject({width: 75, height: 50})
    expect(
      support.calcDimension({width: 100, height: 100}, {width: 50, height: 200})
    ).toMatchObject({width: 25, height: 100})
    expect(
      support.calcDimension({width: 0, height: 0}, {width: 50, height: 200})
    ).toMatchObject({width: 50, height: 200})
    expect(
      support.calcDimension({width: -22, height: -11}, {width: 200, height: 50})
    ).toMatchObject({width: 200, height: 50})
  })
  it.concurrent('inferOpts', async ({ expect }) => {
    const file = new File([new ArrayBuffer(0)], "test file", {type: "image/test_format"})
    const optBagPartial = {
      exportQuality: 0.3,
      imageType: "application/json",
      maxWidth: 22,
      resizeQuality: "pixelated",
    } as ResizeOpts
    const optBag = {
      exportQuality: 1,
      imageType: "image/jpeg",
      maxWidth: 33,
      maxHeight: 1024,
      resizeQuality: "low",
    } as ResizeOpts

    expect(support.inferOpts(file, undefined)).toMatchObject({
      exportQuality: 0.9,
      imageType: "image/test_format",
      maxWidth: -1,
      maxHeight: -1,
      resizeQuality: "high",
    })
    expect(support.inferOpts(file, optBagPartial)).toMatchObject({
      exportQuality: 0.3,
      imageType: "application/json",
      maxWidth: 22,
      maxHeight: -1,
      resizeQuality: "pixelated",
    })
    expect(support.inferOpts(file, optBag)).toMatchObject({
      exportQuality: 1,
      imageType: "image/jpeg",
      maxWidth: 33,
      maxHeight: 1024,
      resizeQuality: "low",
    })
  })
})