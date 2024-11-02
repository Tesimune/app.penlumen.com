import Auth from '@/app/(auth)/auth';


export const metadata = {
  title: 'Penlumen - Authentication',
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Auth>
      {children}
    </Auth>
  );
}

export default Layout;
