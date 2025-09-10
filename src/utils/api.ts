const BASE_URL = "https://railway.bookreview.techtrain.dev";

async function signUp(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${BASE_URL}/users`, {
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
  const res = await fetch(`${BASE_URL}/uploads`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) {
    throw new Error(`Icon upload failed (${res.status}): ${res.statusText}`);
  }
}

async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });
  if (!res.ok) {
    throw new Error(`Login failed (${res.status}): ${res.statusText}`);
  }
  const data = await res.json();
  if (!data.token) throw new Error("Token is missing in login response");
  return data.token;
}

async function getUserInfo(
  token: string
): Promise<{ name: string; iconUrl?: string }> {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch user info (${res.status}): ${res.statusText}`
    );
  }
  return res.json();
}

async function getBooks(token: string, offset = 0) {
  const res = await fetch(`${BASE_URL}/books?offset=${offset}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch books (${res.status}): ${res.statusText}`);
  }

  return res.json();
}
export { signUp, uploadIcon, login, getUserInfo, getBooks };
