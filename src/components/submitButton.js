"use client"
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
export default function SubmitButton() {
    const { user } = useAuth();
    const router=useRouter();
    const handleSubmitClick = () => {
      if (!user) {
        alert('Please login first!');
      }else{
        router.push('/submit');
      }
    };

    return (
    <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold  p-1 text-xs rounded "
        onClick={handleSubmitClick}>
          Submit
    </button>
    );
}