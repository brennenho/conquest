import { HTTPClient } from "."

export async function generateToken(key: string): Promise<string> {
  const response = await HTTPClient.inst().post("/users/generate-token", key)

  return response.data.token
}
