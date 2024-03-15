import { app } from "./server.js";
import { config } from "dotenv";

config();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
