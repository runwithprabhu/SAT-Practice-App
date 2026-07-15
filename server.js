import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// AI Chat proxy endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch(
      "https://text.pollinations.ai/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://text.pollinations.ai",
          Referer: "https://text.pollinations.ai/",
        },
        body: JSON.stringify(req.body),
      }
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Upstream error: ${response.status}` });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve the React build
app.use(express.static(join(__dirname, "dist")));

// SPA fallback — all routes serve index.html
app.get("/{*splat}", (req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
