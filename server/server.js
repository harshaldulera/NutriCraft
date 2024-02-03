import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import dotenv from "dotenv";
dotenv.config();
 
const gemini_api_key = process.env.API_KEY;
console.log(gemini_api_key)
const googleAI = new GoogleGenerativeAI('AIzaSyDwFpFuzIOP94lBQy99OczN0uJkUubTqas');
const geminiConfig = {
  temperature: 0,
  maxOutputTokens: 4096,
};
 
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro-vision",
  geminiConfig,
});
 
const generateRecipe = async () => {
  try {
    // Read image file
    const filePath = "ing2.jpg";
    const imageFile = await fs.readFile(filePath);
    const imageBase64 = imageFile.toString("base64");
 
    const promptConfig = [
      { text: "Recognise the ingredients and give them to me in a comma separated form. Give me a recipe using these ingredients" },
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
    console.log(response.text());
  } catch (error) {
    console.log(" response error", error);
  }
};

const generateInfo = async () => {
  try {
    // Read image file
    const filePath = "cake.jpg";
    const imageFile = await fs.readFile(filePath);
    const imageBase64 = imageFile.toString("base64");
 
    const promptConfig = [
      { text: "Recognise the food item/s in this image. Only the name of the food item do not mention the quantity" },
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
    console.log(response.text());
  } catch (error) {
    console.log(" response error", error);
  }
};
 
generateRecipe();