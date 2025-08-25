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
  const data = await res.json();
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
}

export { signUp, uploadIcon };
