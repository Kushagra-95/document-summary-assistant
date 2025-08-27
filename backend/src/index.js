import express from "express";
import cors from "cors";
import extractRoutes from "./routes/extractRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", extractRoutes);
app.use("/api", summarizeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
