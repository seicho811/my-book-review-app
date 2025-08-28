import Compressor from "compressorjs";

const ONE_MB = 1024 * 1024;

function toFile(blob: Blob, originalName: string) {
  const base = originalName.replace(/\.[^/.]+$/, "");
  const ext = (blob.type || "image/jpeg").includes("png") ? "png" : "jpg";
  return new File([blob], `${base}.${ext}`, {
    type: blob.type || "image/jpeg",
    lastModified: Date.now(),
  });
}

async function compressorOnce(file: File, opts?: Partial<Compressor.Options>) {
  return new Promise<Blob>((resolve, reject) => {
    new Compressor(file, {
      quality: 0.8,
      convertSize: ONE_MB,
      ...opts,
      maxWidth: 512,
      success(result) {
        resolve(result);
      },
      error(error) {
        reject(error);
      },
    });
  });
}

async function compressToLimit(input: File, limit = ONE_MB) {
  let quality = 0.8;
  let currentFile: File = input;

  for (let i = 0; i < 4; i++) {
    const blob = await compressorOnce(currentFile, { quality });
    const next = blob instanceof File ? blob : toFile(blob, input.name);
    if (next.size <= limit) return next;
    quality = Math.max(0.4, quality - 0.15);
    currentFile = next;
  }
  return currentFile;
}

export { compressToLimit, toFile };
