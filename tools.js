// GoyalBox.ai - Logic Engine
const ToolLogic = {
    // --- 1. AI TOOLS LOGIC (Simulation for now) ---
    // Note: Asli AI ke liye hume API chahiye hogi, abhi hum template de rahe hain
    aiProcessing: (input, type) => {
        return `[AI ${type.toUpperCase()} MODE]\n\nBhai, aapka input: "${input}"\n\nAI Response: Ye ek AI generated content hai jo aapke prompt ke mutabik design kiya gaya hai. (API connect hone par asli result aayega).`;
    },

    // --- 2. TEXT TOOLS LOGIC ---
    textTools: {
        "case-converter": (input) => input.toUpperCase(),
        "text-reverse": (input) => input.split('').reverse().join(''),
        "word-counter": (input) => {
            const words = input.trim() ? input.trim().split(/\s+/).length : 0;
            const chars = input.length;
            return `Words: ${words}\nCharacters: ${chars}`;
        },
        "slug-gen": (input) => input.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        "binary-gen": (input) => input.split('').map(char => char.charCodeAt(0).toString(2)).join(' '),
        "remove-spaces": (input) => input.replace(/\s+/g, ' ').trim(),
    },

    // --- 3. DEVELOPER TOOLS LOGIC ---
    devTools: {
        "json-format": (input) => {
            try { return JSON.stringify(JSON.parse(input), null, 4); }
            catch(e) { return "Invalid JSON Bhai!"; }
        },
        "base64-encode": (input) => btoa(input),
        "base64-decode": (input) => {
            try { return atob(input); }
            catch(e) { return "Invalid Base64!"; }
        }
    },

    // --- 4. FINANCE TOOLS LOGIC ---
    financeTools: {
        "gst-calc": (input) => {
            const amount = parseFloat(input) || 0;
            const gst = amount * 0.18;
            return `Total Amount: ${amount}\nGST (18%): ${gst}\nNet Total: ${amount + gst}`;
        }
    },

    // --- 5. UTILITY TOOLS LOGIC ---
    utilTools: {
        "pass-gen": (input) => {
            const len = parseInt(input) || 12;
            return Math.random().toString(36).slice(-len) + Math.random().toString(36).toUpperCase().slice(-4);
        }
    }
};

// Tool Master Function
function executeToolLogic(toolID, input) {
    // AI Tools check
    if (toolID.startsWith('ai-')) return ToolLogic.aiProcessing(input, toolID);

    // Text Tools check
    if (ToolLogic.textTools[toolID]) return ToolLogic.textTools[toolID](input);

    // Dev Tools check
    if (ToolLogic.devTools[toolID]) return ToolLogic.devTools[toolID](input);

    // Finance Tools check
    if (ToolLogic.financeTools[toolID]) return ToolLogic.financeTools[toolID](input);

    // Default Fallback
    return "Bhai, is tool ka logic jaldi hi update hoga! Tab tak ke liye stay tuned.";
}
