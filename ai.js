/* ==========================================
   CampusFind AI Engine - Full Version
   ========================================== */

/**
 * 1. SIMULATED IMAGE ANALYSIS
 * Waits 1.2s to simulate "thinking" then returns a description.
 */
async function generateAIDescription(imageFile) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const fakeDescriptions = [
                "Black leather wallet with multiple cards inside",
                "Blue backpack with college books and a laptop",
                "Android smartphone with cracked screen",
                "Set of metallic keys with a red keychain",
                "Student ID card with blue lanyard",
                "Water bottle with university logo sticker"
            ];
            const randomDesc = fakeDescriptions[Math.floor(Math.random() * fakeDescriptions.length)];
            resolve(randomDesc);
        }, 1200);
    });
}

/**
 * 2. QUICK TEXT GENERATOR
 * Used for the "AI Generate" button on forms.
 */
function generateAIText(type = "lost") {
    const lostSamples = [
        "Blue backpack with notebooks and a laptop",
        "Red wallet with ID cards inside",
        "Silver smartphone lost near library",
        "Set of keys with red keychain"
    ];
    const foundSamples = [
        "Found black leather wallet with multiple cards",
        "Blue backpack containing books and laptop",
        "Android smartphone with cracked screen found",
        "Set of metallic keys with a red keychain"
    ];

    const samples = type === "lost" ? lostSamples : foundSamples;
    return samples[Math.floor(Math.random() * samples.length)];
}

/**
 * 3. SMART KEYWORD EXTRACTION
 * Removes common words like "the" or "with" to find the important keywords.
 */
function extractKeywords(text) {
    if (!text) return [];
    const stopWords = ["with", "and", "the", "of", "a", "an", "in", "on", "for", "to"];
    return text
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "") // remove punctuation
        .split(" ")
        .filter(word => word.length > 2 && !stopWords.includes(word));
}

/**
 * 4. AI MATCH SCORE
 * Compares two descriptions and returns a similarity percentage.
 */
function calculateMatchScore(desc1, desc2) {
    if (!desc1 || !desc2) return 0;

    const k1 = extractKeywords(desc1);
    const k2 = extractKeywords(desc2);

    let matchCount = 0;
    k1.forEach(word => {
        if (k2.includes(word)) matchCount++;
    });

    const maxKeywords = Math.max(k1.length, k2.length);
    if (maxKeywords === 0) return 0;
    
    return Math.round((matchCount / maxKeywords) * 100);
}

/**
 * 5. AUTO TAGGING
 */
function generateTags(description) {
    const keywords = description.toLowerCase();
    const tags = [];
    if (keywords.includes("wallet")) tags.push("wallet");
    if (keywords.includes("phone")) tags.push("electronics");
    if (keywords.includes("bag") || keywords.includes("backpack")) tags.push("bags");
    if (tags.length === 0) tags.push("other");
    return tags;
}