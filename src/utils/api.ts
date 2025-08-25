async function signUp(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch("https://railway.bookreview.techtrain.dev/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Sign up faild (${res.status}): ${res.statusText}`);
  }
  const data = await res.json();
  if (!data.token) throw new Error("Token is missing in sign-up response");
  return data.token;
}

async function uploadIcon(token: string, file: File) {
  const form = new FormData();
  form.append("icon", file);
  const res = await fetch("https://railway.bookreview.techtrain.dev/uploads", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) {
    throw new Error(`Icon upload failed (${res.status}): ${res.statusText}`);
  }
}

export { signUp, uploadIcon };
