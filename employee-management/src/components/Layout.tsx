import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="max-w-5xl mx-auto p-4">
    <header className="text-center mb-6">
      <h1 className="text-3xl font-bold">Employee Management System</h1>
    </header>
    <main>{children}</main>
  </div>
);

export default Layout;
