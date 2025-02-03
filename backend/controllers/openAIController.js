const asyncHandler = require("express-async-handler");
const axios = require("axios");
const ContentHistory = require("../models/ContentHistory");
const User = require("../models/User");
const { GoogleGenerativeAI } = require("@google/generative-ai");

//----Gemini Controller----

const openAIController = asyncHandler(async (req, res) => {
    const { prompt } = req.body; // Rename to avoid confusion
    console.log(prompt);
    try {


        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


        const result = await model.generateContent(prompt);

        //send the response

        const responseText = result.response.candidates[0].content.parts[0].text;  // Correct path for Gemini response
        if (!responseText) {
            console.error("Gemini API returned an empty or unexpected response:", result.response);
            return res.status(500).json({ error: "Gemini API returned an unexpected response." });
        }

        const content = responseText.trim();
        console.log("Gemini Response:", content); // Debugging
        //Create the history
        const newContent = await ContentHistory.create({
            user: req?.user?._id,
            content,
        });
        //Push the content into the user
        const userFound = await User.findById(req?.user?.id);
        userFound.contentHistory.push(newContent?._id);
        //Update the api Request count
        userFound.apiRequestCount += 1;
        await userFound.save();
        res.status(200).json(content);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    openAIController,
};