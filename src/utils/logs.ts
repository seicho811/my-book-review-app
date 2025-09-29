import { postLog } from "./api";

const sendLog = async (token: string, id: string) => {
  if (!token) throw new Error("No token found");
  return await postLog(token, id);
};

export { sendLog };
