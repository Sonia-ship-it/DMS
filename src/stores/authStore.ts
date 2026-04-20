import { create } from 'zustand';
import { apiFetch } from '@/lib/api';

type UserRole = 'discipline';

interface AuthState {
  user: { id: string; name: string; email: string; avatar?: string; role: string } | null;
  token: string | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, phoneNumber: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

const getStoredToken = () => typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
const initialToken = getStoredToken();
const initialUser = initialToken ? decodeJWT(initialToken) : null;

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser ? { id: initialUser.sub, name: initialUser.email.split('@')[0], email: initialUser.email, role: initialUser.role } : null,
  token: initialToken,
  role: 'discipline',
  isAuthenticated: !!initialToken,
  login: async (email, password, role) => {
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const token = data.access_token;
      localStorage.setItem('auth-token', token);

      const decoded = decodeJWT(token);

      set({
        token,
        user: decoded ? { id: decoded.sub, name: decoded.email.split('@')[0], email: decoded.email, role: decoded.role } : null,
        isAuthenticated: true,
        role: role || 'discipline',
      });
    } catch (error) {
      throw error;
    }
  },
  register: async (firstName, lastName, email, phoneNumber, password, role) => {
    try {
      await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, phoneNumber, password, role }),
      });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('auth-token');
    set({ user: null, token: null, isAuthenticated: false });
  },
  setRole: (role) => set({ role }),
}));

