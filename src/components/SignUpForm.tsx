import Compressor from "compressorjs";
import { useState } from "react";
import { useNavigate } from "react-router";
import { signUp, uploadIcon } from "../utils/api";

type Errors = {
  name: boolean;
  email: boolean;
  password: boolean;
};

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({
    name: false,
    email: false,
    password: false,
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [iconRaw, setIconRaw] = useState<File | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);

  const navigate = useNavigate();

  async function handleIconChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setIconRaw(file);
    setIconFile(null);

    setCompressing(true);
    try {
      const blob = await compressImage(file);
      const fileOut = blob instanceof File ? blob : toFile(blob, file);
      setIconFile(fileOut);
    } finally {
      setCompressing(false);
    }
  }

  function toFile(blob: Blob, original: File) {
    const base = original.name.replace(/\.[^/.]+$/, "");
    const ext = (blob.type || "image/jpeg").includes("png") ? "png" : "jpeg";
    return new File([blob], `${base}.${ext}`, {
      type: blob.type || "image/jpeg",
      lastModified: Date.now(),
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors = {
      name: !name,
      email: !email,
      password: !password,
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.password) {
      return;
    }

    setErrors({ name: false, email: false, password: false });

    try {
      const token = await signUp({
        name: name,
        email: email,
        password: password,
      });
      if (iconFile) {
        uploadIcon(token, iconFile);
      }
      navigate("/home");
    } catch (err) {
      setFormError(err?.message ?? "Signup failed");
    }
  }

  async function compressImage(file: File) {
    return new Promise<Blob>((resolve, reject) => {
      const masSizeInBytes = 800 * 1024;

      new Compressor(file, {
        quality: 0.8,
        convertSize: masSizeInBytes,
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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">User name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="username"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      {errors?.name && (
        <div
          className="alert"
          role="alert"
        >
          Name is required.
        </div>
      )}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      {errors?.email && (
        <div
          className="alert"
          role="alert"
        >
          Email is required.
        </div>
      )}
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      {errors?.password && (
        <div
          className="alert"
          role="alert"
        >
          Password is required.
        </div>
      )}
      <div>
        <label htmlFor="iconField">Icon</label>
        <input
          type="file"
          id="iconField"
          name="iconField"
          accept="image/*"
          onChange={handleIconChange}
        />
      </div>
      <button type="submit">Sign up</button>
      {formError && (
        <div
          role="alert"
          className="alert"
        >
          {formError}
        </div>
      )}
    </form>
  );
}
