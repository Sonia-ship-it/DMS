import { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import { ProtectedRoute } from '../auth/ProtectedRoute';

export function DisciplineLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AppSidebar />
        <main className="md:ml-16 lg:ml-60 pt-16 min-h-screen flex flex-col justify-between">
          <div className="flex-1">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
