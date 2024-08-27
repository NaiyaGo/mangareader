
export const metadata = {
    title: "Come on over,Manga readers!",
    description: "As for manga reader,everyone can come here to find their treasure and leave their footprints here.We aim to build a platform for manga lovers to share their ideas and thoughts.",
  };

export default function SubmitLayout({ children }) {
  
    return (
    
        
        
    <div className="flex flex-col h-full bg-harbour bg-opacity-50">
        <div className="flex-grow ">
        {children}
        </div>
    </div>
      
    );
  }
  