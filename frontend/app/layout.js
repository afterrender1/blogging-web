import "./globals.css";
import { Poppins, Montserrat } from 'next/font/google';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['800'], // Define the weights you need
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-montserrat',
});
export const metadata = {
  title: "Daily World",
  description: "Your Daily Dose Of Global News & Stories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning ={true}>
      <body
        className={`${poppins.className} ${montserrat.className} antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
