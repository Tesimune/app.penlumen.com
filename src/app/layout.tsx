import '@/app/css/app.css';
import '@/app/sass/app.scss';
import '@/app/css/global.css';

export const metadata = {
  title: 'Penlumen - Welcome',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
