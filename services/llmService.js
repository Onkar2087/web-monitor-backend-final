import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateSummary = async (diffText) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        const prompt = `
Summarize the key changes from the following diff.

Be concise and clear.
Highlight only important changes.
Include brief evidence.

Diff:
${diffText.slice(0, 3000)}
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        return response.text();

    } catch (error) {
        console.error("Gemini Error:", error.message);
        return `LLM error: ${error.message}`;
    }
};

export const generateEvidence = async (diffText) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        const prompt = `
From the following diff, extract 3-5 short bullet points as evidence of changes.

Rules:
- Keep each point very short (1 line)
- Focus only on meaningful changes
- Avoid repeating full sentences from diff
- Make it human-readable

Diff:
${diffText.slice(0, 3000)}
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        // Convert text → array of lines
        return response.text()
            .split("\n")
            .map(line => line.replace(/^[-•*]\s*/, "").trim())
            .filter(line => line.length > 0)
            .slice(0, 5);

    } catch (error) {
        console.error("Evidence LLM Error:", error.message);
        return [];
    }
};