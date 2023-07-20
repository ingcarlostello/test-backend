// @express
import express from "express";

// @cors
import cors from "cors";

// @Routes
import itemsRoutes from "./routes/itemsRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

// @Routing
app.use("/api/items", itemsRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});







