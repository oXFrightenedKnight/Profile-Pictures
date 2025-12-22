import { useAuth } from "@clerk/clerk-react";

export function useApi() {
  const { getToken } = useAuth();

  const fetchAuthData = async (url: string, options: RequestInit = {}) => {
    const token = await getToken();

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  };
  return { fetchAuthData };
}
