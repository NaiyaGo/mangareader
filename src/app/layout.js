
import { Inter } from "next/font/google";
import "./globals.css";
// import SarkuraBg from "@/components/sakura";
import {AuthProvider} from "@/context/authContext";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MangaReader - Tools for Manga Lovers",
  description: "MangaReader is a collection of tools for manga lovers. It includes manga readers, downloaders, and other tools to enhance your manga reading experience.",
};


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={`${inter.className} bg-homepage -z-10 bg-fixed bg-center bg-cover min-h-screen`}>
        <AuthProvider>
          <div className="containerPage">
            <header className='headContent'>
              <MainContent />
            </header>
            <div className="flex">
              <Sidebar />
              <main className="flex-1 clearfix">
                {children}
              </main>
            </div>
            <footer className="footerContent"></footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
