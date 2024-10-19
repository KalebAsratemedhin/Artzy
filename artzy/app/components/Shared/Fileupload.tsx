// 'use client';

// import { useState, ChangeEvent } from 'react';
// import { IoImagesOutline } from "react-icons/io5";

// export default function FileUpload() {
//   const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       console.log('files', e.target.files)
//       // Convert FileList to an array and map over it to create URLs for each file
//       const newUrls = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
//       // Append new URLs to the existing ones
//       setUploadedImageUrls((prevUrls) => [...prevUrls, ...newUrls]);
//     } else {
//       setUploadedImageUrls([]);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <label htmlFor="files" className='flex gap-2 items-center rounded-md border border-emerald-400 px-2 w-32 cursor-pointer text-emerald-700'>
//           <IoImagesOutline /> Upload
//         </label>
//         <input
//           className='hidden'
//           type="file"
//           name='files'
//           id='files'
//           onChange={handleFileChange}
//           multiple 
//         />
//       </div>

//       <div className='flex flex-wrap gap-4 p-2 mt-4 border-dotted border h-80 rounded-md border-emerald-300'>
//         {uploadedImageUrls.length > 0 && uploadedImageUrls.map((url, index) => (
//           <div key={index}>
//             <img
//               className='object-cover h-32 w-32'
//               src={url}
//               alt={`Uploaded File ${index + 1}`}
//               style={{ maxWidth: '300px' }}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, ChangeEvent } from 'react';
import { IoImagesOutline } from "react-icons/io5";

export default function FileUpload({error}: {error: string}) {
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const urls = []
      for(let i = 0; i < e.target.files.length; i++ ){
        urls.push(URL.createObjectURL(e.target.files[i]))
      
      }
     
      setUploadedImageUrls(urls);

    }
  };

  return (
    <div>
      <div>
        <label htmlFor="files" className='flex gap-2 items-center rounded-md border border-emerald-400 px-2 w-32 cursor-pointer text-emerald-700'>
          <IoImagesOutline /> Upload
        </label>
        <input
          className='hidden'
          type="file"
          name='files'
          id='files'
          onChange={handleFileChange}
          multiple
          accept="image/*" 
        />
        <p className='text-gray-500 text-sm'>Hold ctr or shift to select multiple files </p>
      </div>

      <div className='flex flex-wrap gap-4 p-2 mt-4 border-dotted border h-80 rounded-md border-emerald-300'>
        {uploadedImageUrls.length > 0 && uploadedImageUrls.map((url, index) => (
          <div key={index}>
            <img
              className='object-cover h-32 w-32'
              src={url}
              alt={`Uploaded File ${index + 1}`}
              style={{ maxWidth: '300px' }}
            />
          </div>
        ))}
        {error && <p className='text-red-500'>{error}</p> }
      </div>
    </div>
  );
}
