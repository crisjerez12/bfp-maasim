import * as jose from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.ENCRYPTION_KEY);

export async function encrypt(text: string): Promise<string> {
  // const encoder = new TextEncoder();
  const jwe = await new jose.EncryptJWT({ data: text })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .encrypt(SECRET_KEY);
  return jwe;
}

export async function decrypt(token: string): Promise<string> {
  const { payload } = await jose.jwtDecrypt(token, SECRET_KEY);
  return payload.data as string;
}
