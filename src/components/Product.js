
"use client"
import { createPortal } from 'react-dom';
import { useState ,useRef} from 'react';
import ModalContent from '@/components/ModalContent';
export default function Product() {
    const [imageBaseImage,setImageBaseImage]=useState('');
    const [recognizedText, setRecognizedText] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const fileInputRef = useRef(null);
    const [isFininshed, setIsFinished] = useState(true);
    const closeModal = () => {
        setShowModal(false);
    };
    const handleFileChange = async (file) => {
        if(!isFininshed){
            alert('Please wait for the previous request to finish');
            console.log('Please wait for the previous request to finish');
            return;
        }
        setIsFinished(false);
        
        if (file) {
            //console.log('Selected file:', file);
            // 你可以在这里处理文件，例如上传到服务器或显示预览
            const imageData=await file.arrayBuffer();

            const imageBase64=Buffer.from(imageData).toString('base64');
            const fileUri='data:' + file.type + ';' + 'base64' + ',' + imageBase64;
            //const encodedFileUri=encodeURIComponent(fileUri);
            
            //console.log('fileUri:',fileUri);
            const response=await fetch('/api/cdinary',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({imageBase64:imageBase64})
            });
            if(!response.ok){
                console.error('Network response was not ok');
            }else{
                //弹出模态框，左边显示图片（可预览压缩)，右侧显示文字。
                const data=await response.json();
                if(data.words_result!==undefined&&data.words_result.length>0){
                    setImageBaseImage(fileUri);
                    setRecognizedText(data.words_result);
                    //console.log('recognizedText:',data);
                    setShowModal(true);
                    
                }
                else
                {
                    alert('No text found in the image');
                    console.log('No text found in the image');
                        
                }
                
            }
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
        setIsFinished(true);
    };
    const handleInputChange = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const file = e.target.files[0];
        handleFileChange(file);
    };

    const handleDrop = (e) => {
        e.stopPropagation();
        console.log('Dropped');
        const file = e.dataTransfer.files[0];
        handleFileChange(file);
    };

    const handlePaste = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('Pasted');
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].kind === 'file') {
                const file = items[i].getAsFile();
                console.log('Find Pasted file');
                handleFileChange(file);
                break;
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };
    return (
        <div
             
            className="mb-2 flex flex-col items-center justify-center shadow-md rounded-lg bg-indigo-400 bg-opacity-50 mx-3">
            
            <h2 className="text-5xl text-slate-700 font-black font-mono ">Free Online Image to Text Converter</h2>
            <div className="flex flex-col items-center justify-center">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-white mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 7H10V13H14V7H17L12 3L7 7Z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 15H21V18H3V15Z"
                />
                </svg>
                <label 
                htmlFor='uploadFile'
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                
                className="cursor-pointer hover:bg-slate-200 flex items-center justify-center px-4 py-2 bg-white text-purple-600 rounded-md shadow-md font-semibold text-lg focus:outline-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm1 1v2h8V6H5z"
                    clipRule="evenodd"
                    />
                    <path d="M3 13h14v1H3v-1z" />
                </svg>
                Select Your File
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                    />
                </svg>
                <input id='uploadFile' type="file" ref={fileInputRef} accept=".bmp,.tif,.webp,.png,.jpg,.jpeg,.pdf" className="hidden" onChange={handleInputChange} onPaste={handlePaste}/>
                </label>
                <p className="text-white mt-4">Drag and drop files here</p>
                <p className="text-white mt-6 text-center text-sm">
        Monthly Usage Limit: It&#39;s first-come, first-served, so once it hit that limit, we&#39;ll need to wait until the next month for a fresh start. Keep an eye on the usage and make the most of it!
      </p>
            </div>
        {showModal&&createPortal(
            <ModalContent imageBaseImage={imageBaseImage} recognizedText={recognizedText} closeModal={closeModal} />,
            document.body
        )};

        </div>
    );


}