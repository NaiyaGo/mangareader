import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/context/authContext";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import Product from "@/components/Product";
const SakuraEffect = dynamic(() => import('@/components/Sakurua'), {
  ssr: false, // 禁用服务器端渲染
});
const inter = Inter({ subsets: ["latin"] });
import "@/app/styles/home.css";
export const metadata = {
  title: "MangaReader - Tools for Manga Lovers",
  description: "MangaReader is a collection of tools for manga lovers. It includes manga readers, downloaders, and other tools to enhance your manga reading experience.",
  
};


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={`${inter.className} bg-homepage -z-10 bg-fixed bg-center bg-cover min-h-screen`}>
        <SakuraEffect />
        <AuthProvider>
          <div className="containerPage">
            <header className='headContent'>
              <MainContent />
            </header>
            
            <div className="mainContent flex">
              <Sidebar />
              <main className="flex-1  ">
              
                <Product />
              
                {children}
              </main>
            </div>
            <footer className="footerContent">
            <div className="container mx-auto">
              <nav className="flex justify-center space-x-4">

                <a className="hover:text-gray-400" href="https://RikaCelery.github.io">RikaCelery</a>

              </nav>
            </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
