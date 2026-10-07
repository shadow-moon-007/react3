import { User } from '../types';
import { useAuthStore } from '../stores/authStore';

export interface LoginRequest {
  ntid: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresAt: string;
}

export const authApi = {
  /**
   * Mock NT-ID Login API endpoint: POST /api/auth/login
   * Designed for future Azure AD / SAML SSO federation.
   */
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const user = await useAuthStore.getState().login(payload.ntid);
    return {
      user,
      token: `mock-jwt-${user.ntid}-${Date.now()}`,
      expiresAt: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
    };
  },

  async logout(): Promise<{ success: boolean }> {
    useAuthStore.getState().logout();
    return { success: true };
  },

  async getCurrentSession(): Promise<User | null> {
    await new Promise((r) => setTimeout(r, 80));
    return useAuthStore.getState().user;
  },
};
