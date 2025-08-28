const q: number[] = [];
export function __pushCompressedSizes(...sizes: number[]) {
  q.push(...sizes);
}
export function __clearCompressedSizes() {
  q.length = 0;
}

export default class CompressorMock {
  constructor(file: File, opts: any) {
    const size = q.length ? q.shift()! : file?.size ?? 0;
    const blob = new Blob([new Uint8Array(size)], { type: "image/jpeg" });

    console.log("mock");
    setTimeout(() => opts.success(blob), 0);
  }
}
