import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
export default function CateLayout({ children }) {
  
    return (
    <div className="flex">
        <Sidebar />
        <div className="flex-1 clearfix">
            <MainContent />
            {children}        
        </div>
    </div>
      
    );
  }