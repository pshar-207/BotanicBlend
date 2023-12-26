const express = require("express");
const mysql = require("mysql2/promise"); // Using mysql2 with Promise-based API

const app = express();

const port = 3000; // Or any port you prefer

// Serve static files from the 'public' directory
app.use(express.static("Client")); // Place this line before any route definitions

// MySQL database connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "botanic@123",
  database: "BotanicBlend",
});

// Route to fetch and display names
app.get("/New_Arrivals", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT products.image_url,products.name,products.description,products.rating,MIN(product_variations.price) AS price FROM products INNER JOIN product_variations ON products.id = product_variations.product_id GROUP BY products.image_url,products.name,products.description,products.rating,products.date ORDER BY products.date desc limit 4;"
    );
    console.log(results);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching names");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
