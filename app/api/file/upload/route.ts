// pages/api/upload.js
import axios from 'axios';
import FormData from 'form-data';
import { NextResponse } from 'next/server';
import { createReadStream } from "fs";
import OpenAI from "openai";



const openai = new OpenAI();

export async function POST(request: Request) {
 
    // const { fileUrl } = req.body;
    const fileUrl = "https://drive.google.com/file/d/1DloVHjVo-3TGICOgGis2JDA-IeLY5PZU/view?usp=sharing"
    if (!fileUrl) {
      return NextResponse.json({ error: 'File URL is required' });
    }

    console.log('File URL:>>>', fileUrl);
    try {
      // Fetch the file from the URL
      const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
      const fileContent = Buffer.from(response.data, 'binary');

      // Create form-data to upload the file
      const form = new FormData();
      form.append('file', fileContent, 'SPfromDrive.pdf'); // Adjust the file name and content type as needed
      form.append('purpose', 'fine-tune');

      console.log('Form data>>>>>>>>>>>>>>>>>>>>>>>:', form.getHeaders());

      // Upload the file to OpenAI API
      
      const uploadResponse = await axios.post('https://api.openai.com/v1/files', form, {
        headers: {
          ...form.getHeaders(),
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      });

      return NextResponse.json(uploadResponse.data);
    } catch (error) {
      console.error('Error uploading file:', error.response?.data || error.message);
      return NextResponse.json({ error: 'Failed to upload file' });
    }
  
}








// import OpenAI from "openai";
// import { NextResponse } from "next/server";
// import { createReadStream } from "fs";
// import path from "path";



// const openai = new OpenAI();

// export async function POST(request: Request) {
//     console.log("Request received")

//     const filePath = path.join(process.cwd(), "public", "SP.pdf");
 
//      try {
//          const response = await openai.files.create({
//              file: createReadStream(filePath),
//              purpose: 'assistants',
//          });
 
 
//          return NextResponse.json(response);
//      } catch (error) {
//          console.error("Error uploading file:", error);
//          return NextResponse.json({ message: 'Internal Server Error' });
//      }
//  }
 