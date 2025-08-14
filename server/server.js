import app from "./app.js";
import connectToDb from "./config/db.config.js";

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  await connectToDb();
  console.log(`Server is running on port ${port}`);
});
