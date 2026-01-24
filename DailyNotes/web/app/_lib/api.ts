export type User = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  age?: number | null;
  updatedAt?: string | null;
};

export type UserPayload = {
  name: string;
  email: string;
  phone?: string | null;
  age?: number | null;
};

type HealthStatus = {
  status: string;
  message?: string;
  timestamp?: number;
};

const getApiBaseUrl = () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:8080";
  return baseUrl.replace(/\/+$/, "");
};

const buildApiUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
};

const withJsonHeaders = (init?: RequestInit): RequestInit => ({
  ...init,
  headers: {
    "Content-Type": "application/json",
    ...(init?.headers ?? {}),
  },
});

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(buildApiUrl("/api/users"), {
      ...withJsonHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }

    return (await response.json()) as User[];
  } catch (error) {
    console.error("Failed to fetch users", error);
    return [];
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const response = await fetch(buildApiUrl(`/api/users/${id}`), {
      ...withJsonHeaders(),
      cache: "no-store",
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`);
    }

    return (await response.json()) as User;
  } catch (error) {
    console.error("Failed to fetch user", error);
    return null;
  }
};

export const getHealthStatus = async (): Promise<HealthStatus | null> => {
  try {
    const response = await fetch(buildApiUrl("/api/health"), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch health: ${response.status}`);
    }

    return (await response.json()) as HealthStatus;
  } catch (error) {
    console.error("Failed to fetch health status", error);
    return null;
  }
};

export const createUser = async (payload: UserPayload): Promise<User | null> => {
  try {
    const response = await fetch(buildApiUrl("/api/users"), {
      method: "POST",
      body: JSON.stringify(payload),
      ...withJsonHeaders(),
    });

    if (response.status === 409) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.status}`);
    }

    return (await response.json()) as User;
  } catch (error) {
    console.error("Failed to create user", error);
    return null;
  }
};

export const updateUser = async (
  id: number,
  payload: UserPayload
): Promise<User | null> => {
  try {
    const response = await fetch(buildApiUrl(`/api/users/${id}`), {
      method: "PUT",
      body: JSON.stringify(payload),
      ...withJsonHeaders(),
    });

    if (response.status === 404 || response.status === 409) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.status}`);
    }

    return (await response.json()) as User;
  } catch (error) {
    console.error("Failed to update user", error);
    return null;
  }
};

export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(buildApiUrl(`/api/users/${id}`), {
      method: "DELETE",
      ...withJsonHeaders(),
    });

    if (response.status === 404) {
      return false;
    }

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Failed to delete user", error);
    return false;
  }
};
