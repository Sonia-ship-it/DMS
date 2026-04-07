import { AppHeader } from '@/components/layout/AppHeader';
import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/stores/authStore';
import { Moon, Sun } from 'lucide-react';

export default function SettingsPage() {
  const { isDark, toggle } = useTheme();
  const { user } = useAuthStore();

  return (
    <>
      <AppHeader title="Settings" />
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        <div className="bg-card rounded-xl p-6 shadow-sm border space-y-4">
          <h3 className="font-semibold text-lg">Profile</h3>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-sm font-medium">Name
              <input defaultValue={user?.name} className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <label className="block text-sm font-medium">Email
              <input defaultValue={user?.email} className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </label>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Appearance</h3>
              <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
            </div>
            <button onClick={toggle} className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-muted transition-colors">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="text-sm">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
