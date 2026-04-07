import { create } from 'zustand';

type UserRole = 'recruiter' | 'applicant';

interface AuthState {
  user: { name: string; email: string; avatar?: string } | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => void;
  register: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: { name: 'Claudine U.', email: 'claudine@intore.rw' },
  role: 'recruiter',
  isAuthenticated: true,
  login: (_email, _password, role) => set({
    user: { name: 'Claudine U.', email: _email },
    role: role || 'recruiter',
    isAuthenticated: true,
  }),
  register: (name, email, _password, role) => set({
    user: { name, email },
    role,
    isAuthenticated: true,
  }),
  logout: () => set({ user: null, isAuthenticated: false }),
  setRole: (role) => set({ role }),
}));
