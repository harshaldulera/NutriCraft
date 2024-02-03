import express from 'express';
import fs from "fs/promises";
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors()); 
app.use(express.json());


const googleAI = new GoogleGenerativeAI('AIzaSyDwFpFuzIOP94lBQy99OczN0uJkUubTqas');
const geminiConfig = {
  temperature: 0,
  maxOutputTokens: 4096,
};
 
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro-vision",
  geminiConfig,
});

const generationConfig = {
  temperature: 0.5,
};

const model = googleAI.getGenerativeModel({ model: "gemini-pro",  generationConfig });

const generateIngredients = async (filePath) => {
    try {
      // Read image file
      const imageFile = await fs.readFile(filePath);
      const imageBase64 = imageFile.toString("base64");
   
      const promptConfig = [
        { text: "Recognise the ingredients and give me a space separated list of ingredients without any other information or formatting, if there are no ingredients output a single word ERROR" },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageBase64,
          },
        },
      ];
   
      const result = await geminiModel.generateContent({
        contents: [{ role: "user", parts: promptConfig }],
      });
      const response = await result.response;
      console.log(response.text())
      return response.text()
    } catch (error) {
      console.log(" response error", error);
    }
  };

app.post('/generate-ingredients', async (req, res) => {
 try {
    const filePath = req.body.filePath;
    const ingredients = await generateIngredients(filePath);
    console.log(ingredients)
    res.status(200).send(ingredients);
 } catch (error) {
    console.error('Error generating ingredients:', error);
    res.status(500).send('An error occurred while generating ingredients');
 }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log(`Server listening on port ${port}`);
});