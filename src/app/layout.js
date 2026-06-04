import '../../globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import Navbar from '@/components/navigation/Navbar';
import FullScreenNav from '@/components/navigation/FullScreenNav';
import NavContext from '@/context/NavContext';
import CursorFollower from '@/components/common/CursorFollower';

export const metadata = {
  title: 'Chinmay Meghare — Frontend Developer',
  description: 'Portfolio of Chinmay Meghare — Frontend Developer specializing in React, Next.js, and creative UI animations.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CursorFollower/>
        <NavContext>
          <SmoothScrollProvider>
            <Navbar />
            <FullScreenNav />
            {children}
          </SmoothScrollProvider>
        </NavContext>
      </body>
    </html>
  );
}
