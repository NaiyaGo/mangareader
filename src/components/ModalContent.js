import Image from "next/image";
export default function ModalContent({ imageBaseImage, recognizedText, closeModal }) {

    return (
        <div className="fixed inset-0  h-screen min-h-dvh" >
            <div className="bg-white mx-auto h-5/6 rounded-lg p-4 max-w-3xl w-full " >
                <div className="flex space-x-1 h-full" >
                    <div className="flex-1 p-2 max-h-full">
                        <Image src={imageBaseImage} width={500} height={500} alt="Uploaded" className="max-w-full object-contain"/>
                    </div>
                    <div className='flex-initial border-2 border-black py-2'/>
                    <div className="flex-1 p-2 overflow-y-auto ">
                        <h3 className="text-xl font-bold mb-2">Specified Text</h3>
                        <ul className="list-disc pl-5 break-words ">
                            {recognizedText.map((text, index) => (
                                <li key={index}>{text.words}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-300" >Close</button>
            </div>
        </div>
    );


}