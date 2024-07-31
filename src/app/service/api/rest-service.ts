import axios, { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

// const httpHeaders = {
//   Accept: "application/json",
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${useSession().data?.user.token}`,
// };

export async function postDataAPI({
  endpoint,
  headers,
  body,
  fields,
  isMultipartRequest = false,
}: {
  endpoint: string;
  headers?: Record<string, string>;
  body?: Record<string, any>;
  fields?: Record<string, string>;
  isMultipartRequest?: boolean;
}): Promise<AxiosResponse | null> {
  const session = await getSession();

  const httpHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.user.token}`,
  };

  const baseUrl = process.env.NEXT_PUBLIC_UPLOAD_FILE_URL;

  if (!baseUrl) {
    console.log("[RestService].init: Failed to read base URL from .env");
    return null;
  }

  const url = baseUrl + endpoint;

  if (!isMultipartRequest) {
    return axios.post(url, body, { headers: headers ?? httpHeaders });
  } else {
    const formData = new FormData();
    if (body) {
      Object.keys(body).forEach((key) => {
        formData.append(key, body[key]);
      });
    }
    if (fields) {
      Object.keys(fields).forEach((key) => {
        formData.append(key, fields[key]);
      });
    }
    return axios.post(url, formData, {
      headers: {
        ...httpHeaders,
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
