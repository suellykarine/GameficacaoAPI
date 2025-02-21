import { sql } from "drizzle-orm";
import express from "express";
import { drizzleInstance } from "./drizzleDatabase/db";
import { adminRouter } from "./routes/adminRoutes";
import { userRouter } from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

try {
  drizzleInstance.run(sql`SELECT 1`);
  console.log("Database connected successfully!");
} catch (error) {
  console.error("Database connection failed:", error);
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
