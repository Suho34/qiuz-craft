export const fetchQuizFromAI = async (
  topic,
  difficulty = "medium",
  questionCount = 5
) => {
  // Validate questionCount
  if (
    !Number.isInteger(questionCount) ||
    questionCount < 1 ||
    questionCount > 20
  ) {
    questionCount = 5; // Default to 5 if invalid
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
        import.meta.env.VITE_GEMINI_API_KEY
      }`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate a ${questionCount}-question multiple-choice quiz on the topic "${topic}" with ${difficulty} difficulty. Each question should have exactly 4 options. Return only JSON in the format: { "questions": [{ "question": "", "options": ["", "", "", ""], "correctAnswer": "", "explanation": "" }] }`,
                },
              ],
            },
          ],
        }),
      }
    );

    const json = await res.json();
    const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) throw new Error("Gemini: No text in response");

    const cleanedText = rawText.replace(/```json|```/g, "").trim();

    try {
      return JSON.parse(cleanedText);
    } catch (err) {
      console.error("Gemini JSON parse error:", err);
      console.warn("Gemini raw response:", cleanedText);
      throw new Error("Gemini: Failed to parse JSON");
    }
  } catch (error) {
    console.error("fetchQuizFromAI Error →", error.message);
    throw error;
  }
};
