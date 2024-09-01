
export const metadata = {
    title: "Come on over,Manga readers!",
    description: "As for manga reader,everyone can come here to find their treasure and leave their footprints here.We aim to build a platform for manga lovers to share their ideas and thoughts.",
  };

export default function SubmitLayout({ children }) {
  
    return (
    
        
        
    <div className="flex flex-col max-h-full bg-harbour bg-cover bg-opacity-50 mx-3 rounded-lg">
        <div className="flex-grow mx-auto">
        {children}
        </div>
    </div>
      
    );
  }
  