vi.mock("compressorjs", async () => {
  return await import("../__mocks__/compressorjs");
});
import {
  __pushCompressedSizes,
  __clearCompressedSizes,
} from "../__mocks__/compressorjs";

import { compressToLimit, toFile } from "../../src/utils/compressToLimit";

const MB = 1024 * 1024;

function makeFile(size: number, name = "a.jpg", type = "image/jpeg") {
  return new File([new Uint8Array(size)], name, { type });
}

beforeEach(() => {
  __clearCompressedSizes();
});

describe("compressToLimit", () => {
  it("first try within limit", async () => {
    __pushCompressedSizes(800 * 1024);
    const f = makeFile(3 * MB);
    const out = await compressToLimit(f, MB);
    expect(out.size).toBeLessThanOrEqual(MB);
  });

  it("multiple tries within limit", async () => {
    const sizes = [1.5 * MB, 1.2 * MB, 0.9 * MB];
    __pushCompressedSizes(...sizes);
    const f = makeFile(3 * MB);
    const out = await compressToLimit(f, MB);
    expect(out.size).toBeLessThanOrEqual(MB);
  });

  it("over limit after all tries", async () => {
    __pushCompressedSizes(2 * MB, 1.8 * MB, 1.6 * MB, 1.4 * MB);
    const f = makeFile(3 * MB);
    const out = await compressToLimit(f, MB);
    expect(out.size).toBeGreaterThan(MB);
  });
});

describe("toFile", () => {
  it("keeps original name without extension", () => {
    const blob = new Blob([new Uint8Array(100)], { type: "image/jpeg" });
    const f = toFile(blob, "originalname");
    expect(f.name).toBe("originalname.jpg");
    expect(f.type).toBe("image/jpeg");
  });

  it("keeps extension by type", () => {
    const png = toFile(
      new Blob([new Uint8Array(100)], { type: "image/png" }),
      "x.heic"
    );
    expect(png.name).toBe("x.png");
    expect(png.type).toBe("image/png");

    const jpg = toFile(
      new Blob([new Uint8Array(109)], { type: "image/jpeg" }),
      "y.png"
    );
    expect(jpg.name).toBe("y.jpg");
    expect(jpg.type).toBe("image/jpeg");
  });
});
