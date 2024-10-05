// Layout.tsx
import React, { useEffect } from "react";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  useEffect(() => {
    document.title = "ZonaFitGYM | " + title;
  }, [title]);

  return <>{children}</>;
};

export default Layout;
