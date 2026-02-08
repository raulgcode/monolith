export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  isActive: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface SetupStatusResponse {
  needsSetup: boolean;
  hasUsers: boolean;
}

export interface SetupRequest {
  email: string;
  password: string;
  name: string;
}

export interface SetupResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
