
import { Inter } from "next/font/google";
import "./globals.css";
//import SarkuraBg from "@/components/sakura";
import {AuthProvider} from "@/context/authContext";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
    
  {/* <SarkuraBg/>  */}
      
      <body className={`${inter.className} `}><AuthProvider>{children}</AuthProvider></body>
     

    </html>
  );
}
