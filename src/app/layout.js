
import { Inter } from "next/font/google";
import "./globals.css";
// import SarkuraBg from "@/components/sakura";
import {AuthProvider} from "@/context/authContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MangaReader - Tools for Manga Lovers",
  description: "MangaReader is a collection of tools for manga lovers. It includes manga readers, downloaders, and other tools to enhance your manga reading experience.",
};


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
    
  {/* <SarkuraBg/>  */}
      
      <body className={`${inter.className}  `}><AuthProvider>{children}</AuthProvider></body>
     

    </html>
  );
}
