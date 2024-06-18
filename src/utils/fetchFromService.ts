import axios, { Method } from "axios";
import dotenv from "dotenv";

dotenv.config();

enum ServiceNames {
  USERS = "user-service",
  DISCUSSIONS = "discussion-service",
  COMMENTS = "comment-service",
}

type TFetchOptions = {
  method: Method;
  url: String;
  body?: any;
};

const serviceUrls = {
  [ServiceNames.USERS]: `${process.env.USER_SERVICE_ENDPOINT}/api/users`,
  [ServiceNames.DISCUSSIONS]: `${process.env.DISCUSSION_SERVICE_ENDPOINT}/api/discussions`,
  [ServiceNames.COMMENTS]: `${process.env.COMMENT_SERVICE_ENDPOINT}/api/comments`,
};

export const fetchFromService = async (
  service: ServiceNames,
  options: TFetchOptions
) => {
  const { method, url, body } = options;
  const serviceUrl = serviceUrls[service];
  const token = process.env.BEARER_TOKEN || "";

  try {
    const response = await axios({
      method,
      url: `${serviceUrl}${url}`,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Internal Service Error");
  }
};

export { ServiceNames };
