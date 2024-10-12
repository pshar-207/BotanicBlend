require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const session = require("express-session");
const { request } = require("http");
const { cpSync } = require("fs");
const { and } = require("sequelize");
const { userInfo } = require("os");
const { connect } = require("http2");

// Use sessions
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "Client")));

const fs = require("fs");
const { log } = require("console");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 27280,
  ssl: {
    ca: fs.readFileSync(__dirname + `${process.env.CA_PATH}`),
    rejectUnauthorized: true,
  },
});

// Check connection to the MySQL database
(async () => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT 1");
    console.log("Database connected successfully!");
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
})();

// Check authentication status
app.get("/checkAuth", (req, res) => {
  // Check if the user is authenticated
  if (req.session.isAuthenticated) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

//SingUp
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/signup", async (req, res) => {
  try {
    // Check if the user is already authenticated
    if (req.session.isAuthenticated) {
      return res.status(400).json({ message: "User is already logged in" });
    }

    // Get form data from the request body
    const { fname, lname, email, password } = req.body;

    // Check if the email already exists in the database
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      // If email already exists, return an error message
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password using a library like bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare the SQL query to insert data into the `users` table
    const [result] = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
      [fname, lname, email, hashedPassword]
    );

    // Set the user as authenticated in the session
    req.session.isAuthenticated = true;
    req.session.userId = result.insertId;

    // Send a success response
    res.redirect(`index.html?successMessage=User created successfully`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user"); // Send an error response
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// password reset
app.post("/PasswordReset", async (req, res) => {
  try {
    // Check if the user is already authenticated
    if (req.session.isAuthenticated) {
      return res.status(400).json({ message: "User is already logged in" });
    }

    // Get form data from the request body
    const { fname, lname, email, new_password } = req.body;
    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log(new_password);

    // Check if a user with the provided first name, last name, and email exists in the database
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE first_name = ? AND last_name = ? AND email = ?",
      [fname, lname, email]
    );

    if (existingUser.length === 0) {
      // If no user found, return an error message
      return res.status(400).json({ message: "User not found" });
    }

    // Hash the new password using a library like bcrypt
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Update the password for the matched user
    await pool.query(
      "UPDATE users SET password = ? WHERE first_name = ? AND last_name = ? AND email = ?",
      [hashedPassword, fname, lname, email]
    );

    // Send a success response
    res.redirect(`index.html?successMessage=Password changed successfully`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error changing password"); // Send an error response
  }
});

// Logout route
app.get("/logout", (req, res) => {
  // Clear the session to log out the user
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json("Error logging out");
    } else {
      //res.redirect("/"); // Redirect to home or login page
      res.json({ message: "Logged out successfully" });
    }
  });
});

// Login route
app.post("/login", async (req, res) => {
  try {
    // Check if the user is already authenticated
    if (req.session.isAuthenticated) {
      return res.status(400).json({ message: "User is already logged in" });
    }

    // Get form data from the request body
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      // User not found
      return res.status(401).json({ message: "Account does not exist" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, rows[0].password);

    if (!isPasswordValid) {
      // Incorrect password
      return res.status(401).json({ message: "Invalid password" });
    }

    // Set the user as authenticated in the sessiony

    req.session.isAuthenticated = true;

    req.session.userId = rows[0].user_id;

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in" });
  }
});

// Server-side route to check authentication status
app.get("/isUserLogedIn", (req, res) => {
  // Check if the user is authenticated
  if (req.session.isAuthenticated) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

//fetch user details
app.get("/user_detail", (req, res) => {
  // Check if the user is authenticated
  if (req.session.isAuthenticated) {
    // Get user details from the database based on the user's ID stored in the session
    console.log("logged in");
    const userId = req.session.userId;
    console.log(userId);
    pool
      .query(
        "SELECT first_name, last_name, email, birthday, skin_type FROM users LEFT JOIN profiles ON users.user_id = profiles.user_id WHERE users.user_id = ?",
        [userId]
      )
      .then(([rows]) => {
        if (rows.length > 0) {
          const user = rows[0];
          res.json({ userDetails: user });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ isAuthenticated: false });
      });
  }
});

// Use bodyParser middleware to parse JSON
app.use(bodyParser.json());

// Update name route
app.post("/update-name", async (req, res) => {
  try {
    const userId = req.session.userId;
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "Both first name and last name are required",
      });
    }

    // Perform the update in the database
    await pool.query(
      "UPDATE users SET first_name = ?, last_name = ? WHERE user_id = ?",
      [firstName, lastName, userId]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});
// Update email route
app.post("/update-email", async (req, res) => {
  try {
    const userId = req.session.userId;
    const { newEmail } = req.body;

    // Perform the update in the database
    await pool.query("UPDATE users SET email = ? WHERE user_id = ?", [
      newEmail,
      userId,
    ]);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});
// Update password route
app.post("/update-password", async (req, res) => {
  try {
    const userId = req.session.userId;
    const { previousPassword, newPassword } = req.body;

    // Get the user's current hashed password from the database
    const [rows] = await pool.query(
      "SELECT password FROM users WHERE user_id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const hashedPassword = rows[0].password;

    // Compare the provided previous password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(
      previousPassword,
      hashedPassword
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid previous password" });
    }

    // Hash the new password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await pool.query("UPDATE users SET password = ? WHERE user_id = ?", [
      newHashedPassword,
      userId,
    ]);

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error updating password" });
  }
});
// Update or insert date of birth route
app.post("/update-dob", async (req, res) => {
  try {
    const userId = req.session.userId;
    const { newDob } = req.body;

    // Check if the user already has a date of birth in the profiles table
    const [existingProfile] = await pool.query(
      "SELECT birthday FROM profiles WHERE user_id = ?",
      [userId]
    );
    if (existingProfile.length === 1 && existingProfile[0].birthday !== null) {
      res.json({ success: false, message: "Date of birth already added" });
    } else {
      await pool.query(
        "INSERT INTO profiles (user_id, birthday) VALUES (?,?) ON DUPLICATE KEY UPDATE birthday = ?",
        [userId, newDob, newDob]
      );
      res.json({ success: true });
    }
  } catch (err) {
    console.error("Error updating/inserting DOB:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
//route to handle skin-type updates
app.post("/update-skin-type", async (req, res) => {
  try {
    const userId = req.session.userId; // Assuming you have user information in the request

    // Get the skin-type from the request body
    const { skinType } = req.body;

    // Use the INSERT INTO ... ON DUPLICATE KEY UPDATE syntax
    const result = await pool.query(
      "INSERT INTO profiles (user_id, skin_type) VALUES (?, ?) ON DUPLICATE KEY UPDATE skin_type = ?",
      [userId, skinType, skinType]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating skin-type:", error);
    res.json({ success: false });
  }
});

//New Arrivals
app.get("/New_Arrivals", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT p.image_url, p.name, p.rating, pv.price, pv.size FROM products p INNER JOIN (SELECT product_id, MIN(price) AS min_price FROM product_variations GROUP BY product_id) AS min_prices ON p.id = min_prices.product_id INNER JOIN product_variations pv ON p.id = pv.product_id AND min_prices.min_price = pv.price ORDER BY p.date DESC LIMIT 4;"
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching names");
  }
});

//Best Sellers
app.get("/Best_Sellers", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT p.image_url, p.name, p.rating, pv.price, pv.size FROM products p INNER JOIN (SELECT product_id, MIN(price) AS min_price FROM product_variations GROUP BY product_id) AS min_prices ON p.id = min_prices.product_id INNER JOIN product_variations pv ON p.id = pv.product_id AND min_prices.min_price = pv.price WHERE p.best_seller = TRUE limit 4;"
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching names");
  }
});

// fetch all products
app.get("/getAllProducts", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT p.image_url, p.name, p.rating, pv.price, pv.size FROM products p INNER JOIN (SELECT product_id, MIN(price) AS min_price FROM product_variations GROUP BY product_id) AS min_prices ON p.id = min_prices.product_id INNER JOIN product_variations pv ON p.id = pv.product_id AND min_prices.min_price = pv.price;"
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching products");
  }
});

//All Best Sellers
app.get("/All_Best_Sellers", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT products.image_url,products.name,products.rating,MIN(product_variations.price) AS price, MIN(product_variations.size) AS size FROM products INNER JOIN product_variations ON products.id = product_variations.product_id WHERE products.best_seller = TRUE GROUP BY products.image_url, products.name, products.rating;"
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching names");
  }
});

//All New Arrivals
app.get("/All_New_Arrivals", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT products.image_url,products.name,products.rating,MIN(product_variations.price) AS price,MIN(product_variations.size) AS size FROM products INNER JOIN product_variations ON products.id = product_variations.product_id GROUP BY products.image_url, products.name, products.rating, products.date ORDER BY products.date DESC LIMIT 8;"
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching names");
  }
});

//All CREAMS PRODUCTS
app.get("/All_Creams_Products", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT products.image_url,products.name,products.rating,MIN(product_variations.price) AS price,MIN(product_variations.size) AS size FROM products INNER JOIN product_variations ON products.id = product_variations.product_id WHERE products.category = 'Creams' GROUP BY products.image_url, products.name, products.rating;"
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching names");
  }
});

//All GELS PRODUCTS
app.get("/All_Gels_Products", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT products.image_url,products.name,products.rating,MIN(product_variations.price) AS price,MIN(product_variations.size) AS size FROM products INNER JOIN product_variations ON products.id = product_variations.product_id WHERE products.category = 'gels' GROUP BY products.image_url, products.name, products.rating;"
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching names");
  }
});

//All BATHING PRODUCTS
app.get("/All_Bathing_Products", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT products.image_url,products.name,products.rating,MIN(product_variations.price) AS price,MIN(product_variations.size) AS size FROM products INNER JOIN product_variations ON products.id = product_variations.product_id WHERE products.category = 'bathing' GROUP BY products.image_url, products.name, products.rating;"
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching names");
  }
});

//All BODYCARE PRODUCTS
app.get("/All_BodyCare_Products", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT products.image_url,products.name,products.rating,MIN(product_variations.price) AS price,MIN(product_variations.size) AS size FROM products INNER JOIN product_variations ON products.id = product_variations.product_id WHERE products.category = 'bodyCare' GROUP BY products.image_url, products.name, products.rating;"
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching names");
  }
});

//DRY SKIN PRODUCTS
app.get("/DrySkin_Products", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT products.image_url,products.name,products.rating,MIN(product_variations.price) AS price,MIN(product_variations.size) AS size FROM products INNER JOIN product_variations ON products.id = product_variations.product_id WHERE products.Dry = 1 GROUP BY products.image_url, products.name, products.rating;"
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching names");
  }
});

//OILY SKIN PRODUCTS
app.get("/OilySkin_Products", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT products.image_url,products.name,products.rating,MIN(product_variations.price) AS price,MIN(product_variations.size) AS size FROM products INNER JOIN product_variations ON products.id = product_variations.product_id WHERE products.Oily = 1 GROUP BY products.image_url, products.name, products.rating;"
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching names");
  }
});

//NORMAL SKIN PRODUCTS
app.get("/NormalSkin_Products", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT products.image_url,products.name,products.rating,MIN(product_variations.price) AS price,MIN(product_variations.size) AS size FROM products INNER JOIN product_variations ON products.id = product_variations.product_id WHERE products.Normal = 1 GROUP BY products.image_url, products.name, products.rating;"
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching names");
  }
});

//USER FEEDBACK
app.post("/submitFeedback", async (req, res) => {
  try {
    const { name, email, phoneNumber, comment } = req.body;
    console.log(req.session.userId);
    console.log(name, email, phoneNumber, comment);

    if (req.session.userId) {
      await pool.query(
        "INSERT INTO feedback (user_id, name, email, phone_number, comment) VALUES (?, ?, ?, ?, ?)",
        [req.session.userId, name, email, phoneNumber, comment]
      );

      res.json({ success: true, message: "Feedback submitted successfully" });
    } else {
      await pool.query(
        "INSERT INTO feedback (name, email, phone_number, comment) VALUES (?, ?, ?, ?)",
        [name, email, phoneNumber, comment]
      );

      res.json({ success: true, message: "Feedback submitted successfully" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error submitting feedback" });
  }
});

// Handle product details request
app.get("/productDetails", async (req, res) => {
  const productName = req.query.productName;
  try {
    const [results] = await pool.query(
      "SELECT p.image_url, p.name, p.rating, p.description, pv.size, pv.price, pd.KeyIngredients, pd.Features, pd.HowToUse, pd.Caution FROM products p JOIN product_variations pv ON p.id = pv.product_id JOIN product_description pd ON p.id = pd.product_id WHERE p.name = ?;",
      [productName]
    );
    res.json(results);
    // console.log(results[0].rating);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching names");
  }
});

// Endpoint to submit a review
app.post("/submitReview", async (req, res) => {
  try {
    const { rating, title, body, productName } = req.body;
    const userId = req.session.userId;
    const productIdResult = await pool.query(
      "SELECT id FROM products WHERE name = ?",
      [productName]
    );

    const productId = productIdResult[0][0].id;

    // Insert the review into the database
    const [result] = await pool.query(
      "INSERT INTO reviews (user_id, product_id,user_rating, title, body) VALUES (?, ?, ?, ?, ?)",
      [userId, productId, rating, title, body]
    );

    // Next, perform the UPDATE query
    const [updateResult] = await pool.query(
      "UPDATE products SET rating = (SELECT AVG(user_rating) FROM reviews WHERE product_id = ?) WHERE id = ?",
      [productId, productId]
    );

    [rows] = await pool.query(
      "SELECT  CONCAT(u.first_name, ' ', u.last_name) AS user_name, r.created_at, r.user_rating, r.title, r.body FROM users u JOIN reviews r ON u.user_id = r.user_id WHERE r.product_id = ?",
      [productId]
    );

    res.json({ success: true, reviews: rows });
  } catch (error) {
    console.log("review not submited");
    console.error("Error submitting review:", error);
    res.json({ success: false });
  }
});

//get reviews
app.get("/getReviews", async (req, res) => {
  try {
    const productName = req.query.productName; // Access product_Name from the query parameters

    const productIdResult = await pool.query(
      "SELECT id FROM products WHERE name = ?",
      [productName]
    );
    const productId = productIdResult[0][0].id;
    let rows = [];
    if (req.session.isAuthenticated) {
      [rows] = await pool.query(
        "SELECT  CONCAT(u.first_name, ' ', u.last_name) AS user_name, u.user_id AS user_id, r.review_id AS reviewId, r.created_at, r.user_rating, r.title, r.body FROM users u JOIN reviews r ON u.user_id = r.user_id WHERE r.product_id = ? order by r.created_at desc",
        [productId]
      );
      res.json({ reviews: rows, sessionId: req.session.userId });
    } else {
      [rows] = await pool.query(
        "SELECT  CONCAT(u.first_name, ' ', u.last_name) AS user_name, r.created_at, r.user_rating, r.title, r.body FROM users u JOIN reviews r ON u.user_id = r.user_id WHERE r.product_id = ? order by r.created_at desc",
        [productId]
      );
      res.json({ reviews: rows });
    }
  } catch (error) {
    console.log("review not found");
    console.error("Error getting review:", error);
    res.json({ success: false });
  }
});

// Delete a review
app.delete("/deleteReview/:reviewId", async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    // Ensure the user is authenticated before allowing deletion
    if (!req.session.isAuthenticated) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Delete the review from the database
    const result = await pool.query("DELETE FROM reviews WHERE review_id = ?", [
      reviewId,
    ]);

    if (result[0].affectedRows > 0) {
      res.json({ success: true, message: "Review deleted successfully" });
    } else {
      res.json({ success: false, message: "Review not found" });
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    res.json({ success: false });
  }
});

// Endpoint to add to cart
app.post("/AddToCart", async (req, res) => {
  try {
    const name = req.body.name;
    const userId = req.session.userId;

    // Check if the product is already in the cart for the user
    const [existingProduct] = await pool.query(
      "SELECT * FROM cart WHERE user_id = ? AND product_name = ?",
      [userId, name]
    );

    if (existingProduct.length > 0) {
      // Product already exists in the cart
      console.log("Product already in the cart");
      res.json({ success: false, message: "Product already in the cart" });
    } else {
      // Product does not exist in the cart, insert it
      const [result] = await pool.query(
        "INSERT INTO cart (user_id, product_name) VALUES (?, ?)",
        [userId, name]
      );
      console.log("Product added to the cart");
      res.json({ success: true, message: "Product added to the cart" });
    }
  } catch (error) {
    console.log("Failed to add product to cart");
    console.error("Error AddToCart:", error);
    res.json({ success: false, message: "Failed to add product to cart" });
  }
});

//get Add to Cart Products
app.get("/GetAddToCartProducts", async (req, res) => {
  try {
    const id = req.session.userId;

    let rows = [];
    if (req.session.isAuthenticated) {
      [rows] = await pool.query(
        "SELECT DISTINCT p.name AS product_name, p.image_url AS img_url, p.rating AS rating, v.price AS price, v.size AS size FROM products p JOIN product_variations v ON p.id = v.product_id JOIN cart c ON p.name = c.product_name WHERE c.user_id = ? AND v.price = (SELECT MIN(v2.price) FROM product_variations v2 WHERE v2.product_id = p.id);",
        [id]
      );
      res.json({ success: true, row: rows });
    }
  } catch (error) {
    console.log("cart product not found");
    console.error("Error getting review:", error);
    res.json({ success: false });
  }
});

// Endpoint to remove from cart
app.post("/RemoveFromCart", async (req, res) => {
  try {
    const productName = req.body.productName;
    const userId = req.session.userId;

    const [result] = await pool.query(
      "DELETE FROM cart WHERE user_id = ? AND product_name = ?",
      [userId, productName]
    );
    if (result.affectedRows > 0) {
      console.log("Product removed from the cart");
      res.json({ success: true, message: "Product removed from the cart" });
    } else {
      console.log("Product not found in the cart");
      res.json({ success: false, message: "Product not found in the cart" });
    }
  } catch (error) {
    console.log("Failed to remove product from the cart");
    console.error("Error RemoveFromCart:", error);
    res.json({
      success: false,
      message: "Failed to remove product from the cart",
    });
  }
});

// Endpoit to get quiz result
app.get("/GetQuizResults", async (req, res) => {
  try {
    const skinType = req.query.skinTypeName;
    const acne = req.query.Has_Active_Acne;

    if (skinType == "Dry") {
      if (acne == "Yes") {
        [firstRows] = await pool.query(
          "SELECT products.name, products.image_url, product_variations.price, products.rating, product_variations.size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','KESAR CHANDAN GEL','GLYCERINE GULAB GEL','NEEM TULSI FACEWASH') and product_variations.size in ('100ML','50ML')"
        );
        [secondRows] = await pool.query(
          "SELECT products.name, products.image_url, max(product_variations.price) as price, products.rating, max(product_variations.size) as size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','KESAR CHANDAN GEL','GLYCERINE GULAB GEL','NEEM TULSI FACEWASH') GROUP BY products.name, products.image_url, products.rating"
        );
        [thirdRows] = await pool.query(
          "SELECT products.name, products.image_url, max(product_variations.price) as price, products.rating, MAX(CASE WHEN products.name = 'BODY BUTTER' THEN '250ml' ELSE product_variations.size END) AS size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','KESAR CHANDAN GEL','BODY BUTTER','GLYCERINE GULAB GEL','FOOT CREAM','NEEM TULSI FACEWASH')GROUP BY products.name, products.image_url, products.rating"
        );
      }
      if (acne == "No") {
        [firstRows] = await pool.query(
          "SELECT products.name, products.image_url,product_variations.price, products.rating, product_variations.size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','KESAR CHANDAN GEL','GLYCERINE GULAB GEL','VITAMIN C FACEWASH') and product_variations.size in ('100ML','50ML')"
        );
        [secondRows] = await pool.query(
          "SELECT products.name, products.image_url,max(product_variations.price) as price, products.rating, max(product_variations.size) as size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','KESAR CHANDAN GEL','GLYCERINE GULAB GEL','VITAMIN C FACEWASH') GROUP BY products.name, products.image_url, products.rating"
        );
        [thirdRows] = await pool.query(
          "SELECT products.name, products.image_url,max(product_variations.price) as price, products.rating, MAX(CASE WHEN products.name = 'BODY BUTTER' THEN '250ml' ELSE product_variations.size END) AS size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','KESAR CHANDAN GEL','BODY BUTTER','GLYCERINE GULAB GEL','FOOT CREAM','VITAMIN C FACEWASH')GROUP BY products.name, products.image_url, products.rating"
        );
      }
    }
    if (skinType == "Oily") {
      if (acne == "Yes") {
        [firstRows] = await pool.query(
          "SELECT products.name, products.image_url,product_variations.price, products.rating, product_variations.size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','ALOE VERA CREAM','KESAR CHANDAN GEL','NEEM TULSI FACEWASH') and product_variations.size in ('100ML','50ML')"
        );
        [secondRows] = await pool.query(
          "SELECT products.name, products.image_url,max(product_variations.price) as price, products.rating, max(product_variations.size) as size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','ALOE VERA CREAM','KESAR CHANDAN GEL','NEEM TULSI FACEWASH') GROUP BY products.name, products.image_url, products.rating"
        );
        [thirdRows] = await pool.query(
          "SELECT products.name, products.image_url,max(product_variations.price) as price, products.rating, max(product_variations.size) as size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','ALOE VERA CREAM','KESAR CHANDAN GEL','WALNUT SCRUB','UNDER EYE GEL','NEEM TULSI FACEWASH') GROUP BY products.name, products.image_url, products.rating"
        );
      }
      if (acne == "No") {
        [firstRows] = await pool.query(
          "SELECT products.name, products.image_url,product_variations.price, products.rating, product_variations.size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','ALOE VERA CREAM','KESAR CHANDAN GEL','VITAMIN C FACEWASH') and product_variations.size in ('100ML','50ML')"
        );
        [secondRows] = await pool.query(
          "SELECT products.name, products.image_url,max(product_variations.price) as price, products.rating, max(product_variations.size) as size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','ALOE VERA CREAM','KESAR CHANDAN GEL','VITAMIN C FACEWASH') GROUP BY products.name, products.image_url, products.rating"
        );
        [thirdRows] = await pool.query(
          "SELECT products.name, products.image_url,max(product_variations.price) as price, products.rating, max(product_variations.size) as size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','ALOE VERA CREAM','KESAR CHANDAN GEL','WALNUT SCRUB','UNDER EYE GEL','VITAMIN C FACEWASH') GROUP BY products.name, products.image_url, products.rating"
        );
      }
    }
    if (skinType == "Normal") {
      if (acne == "Yes") {
        [firstRows] = await pool.query(
          "SELECT products.name, products.image_url,product_variations.price, products.rating, product_variations.size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','VITAMIN C CREAM','ALOE VERA GEL','NEEM TULSI FACEWASH') and product_variations.size in ('100ML','50ML')"
        );
        [secondRows] = await pool.query(
          "SELECT products.name, products.image_url,max(product_variations.price) as price, products.rating, MAX(CASE WHEN products.name = 'ALOE VERA GEL' THEN '250ml' ELSE product_variations.size END) as size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','VITAMIN C CREAM','ALOE VERA GEL','NEEM TULSI FACEWASH') GROUP BY products.name, products.image_url, products.rating"
        );
        [thirdRows] = await pool.query(
          "SELECT products.name, products.image_url,max(product_variations.price) as price, products.rating, MAX(CASE WHEN products.name = 'ALOE VERA GEL' THEN '250ml' ELSE product_variations.size END) as size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','VITAMIN C CREAM','ALOE VERA GEL','FOOT CREAM','UNDER EYE GEL','NEEM TULSI FACEWASH') GROUP BY products.name, products.image_url, products.rating"
        );
      }
      if (acne == "No") {
        [firstRows] = await pool.query(
          "SELECT products.name, products.image_url,product_variations.price, products.rating, product_variations.size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','VITAMIN C CREAM','ALOE VERA GEL','VITAMIN C FACEWASH') and product_variations.size in ('100ML','50ML')"
        );
        [secondRows] = await pool.query(
          "SELECT products.name, products.image_url,max(product_variations.price) as price, products.rating, MAX(CASE WHEN products.name = 'ALOE VERA GEL' THEN '250ml' ELSE product_variations.size END) as size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','VITAMIN C CREAM','ALOE VERA GEL','VITAMIN C FACEWASH') GROUP BY products.name, products.image_url, products.rating"
        );
        [thirdRows] = await pool.query(
          "SELECT products.name, products.image_url,max(product_variations.price) as price, products.rating, MAX(CASE WHEN products.name = 'ALOE VERA GEL' THEN '250ml' ELSE product_variations.size END) as size FROM products JOIN product_variations ON products.id = product_variations.product_id WHERE products.name in ('SUNSCREEN','VITAMIN C CREAM','ALOE VERA GEL','FOOT CREAM','UNDER EYE GEL','VITAMIN C FACEWASH') GROUP BY products.name, products.image_url, products.rating"
        );
      }
    }

    res.json({
      success: true,
      First_Row: firstRows,
      Second_Row: secondRows,
      Third_Row: thirdRows,
    });
  } catch (error) {
    console.log("Quiz products not found");
    console.error("Error getting quiz products:", error);
    res.json({ success: false });
  }
});

// Assuming you have a route for handling purchases
app.post("/purchase", async (req, res) => {
  try {
    const {
      email,
      country,
      fname,
      lname,
      address,
      city,
      state,
      pincode,
      phone,
      paymentMethod,
      billingAddress,
      diffcountry,
      difffname,
      difflname,
      diffaddress,
      diffcity,
      diffstate,
      diffpincode,
      diffphone,
      amount,
      productList,
      saveInfo,
    } = req.body;
    console.log(email);
    console.log(country);
    console.log(fname);
    console.log(lname);
    console.log(address);
    console.log(city);
    console.log(state);
    console.log(pincode);
    console.log(phone);
    console.log(paymentMethod);
    console.log(billingAddress);
    console.log(diffcountry);
    console.log(difffname);
    console.log(difflname);
    console.log(diffaddress);
    console.log(diffcity);
    console.log(diffstate);
    console.log(diffpincode);
    console.log(diffphone);
    console.log(amount);
    productList.forEach((item) => {
      console.log(item.name);
    });

    var userId = null;
    if (req.session.isAuthenticated) {
      userId = req.session.userId;
    }
    console.log(userId);
    console.log("save " + saveInfo);
    // Get the current date and time
    const currentDate = new Date();

    // Format the date and time as a string (you can adjust the format as needed)
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    console.log(formattedDate);
    await pool.query(
      "INSERT INTO purchases (user_id, email, purchase_date, total_amount, payment_method, saveInfo) VALUES (?,?,?,?,?,?)",
      [userId, email, formattedDate, amount, paymentMethod, saveInfo]
    );
    const purchaseId = await pool.query(
      "select purchase_id from purchases where purchase_date = ?",
      [formattedDate]
    );

    async function insertProducts() {
      try {
        await Promise.all(
          productList.map(async (item) => {
            await pool.query(
              "INSERT INTO purchase_products (purchase_id, user_id, product_Name, produc_img, quantity, size, price) VALUES (?,?,?,?,?,?,?)",
              [
                purchaseId[0][0].purchase_id,
                userId,
                item.name,
                item.img,
                item.qty,
                item.size,
                item.price,
              ]
            );
          })
        );
        console.log("All products inserted successfully");
      } catch (error) {
        console.error("Error inserting products:", error);
        // Handle the error as needed
      }
    }
    // Call the async function
    insertProducts();

    console.log("id " + purchaseId[0][0].purchase_id);
    await pool.query(
      "INSERT INTO shipping_addresses (user_id, purchase_id, country_region, first_name, last_name, address, city, state, pincode, phone_number) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        userId,
        purchaseId[0][0].purchase_id,
        country,
        fname,
        lname,
        address,
        city,
        state,
        pincode,
        phone,
      ]
    );
    if (billingAddress === "DiiffrentAddress") {
      await pool.query(
        "INSERT INTO billing_addresses (user_id, purchase_id, country_region, first_name, last_name, address, city, state, pincode, phone_number) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [
          userId,
          purchaseId[0][0].purchase_id,
          diffcountry,
          difffname,
          difflname,
          diffaddress,
          diffcity,
          diffstate,
          diffpincode,
          diffphone,
        ]
      );
    }
    res.json({ success: true, message: "Purchase successful" });
  } catch (error) {
    console.error("Error completing purchase:", error);
    res
      .status(500)
      .json({ success: false, message: "Error completing purchase" });
  }
});

app.get("/getUserAddressInfo", async (req, res) => {
  try {
    const userId = req.session.userId;

    const isSaveChecked = await pool.query(
      "SELECT MAX(saveInfo) AS final_saveInfo FROM purchases WHERE user_id = ? GROUP BY user_id",
      [userId]
    );
    if (isSaveChecked[0][0].final_saveInfo == 1) {
      let rows = [];
      if (req.session.isAuthenticated) {
        [rows] = await pool.query(
          "select * from shipping_addresses where user_id=? limit 1",
          [userId]
        );
        console.log(rows);
        res.json({ success: true, row: rows });
      }
    }
  } catch (error) {
    console.log("address not found");
    console.error("Error getting address:", error);
    res.json({ success: false });
  }
});

app.get("/getUserPurchaseProducts", async (req, res) => {
  try {
    const userId = req.session.userId;
    let rows = [];
    [rows] = await pool.query(
      "SELECT pp.produc_img,pp.product_Name,pp.quantity,pp.size,pp.price,p.rating,pu.purchase_date FROM purchase_products pp JOIN products p ON pp.product_Name = p.name JOIN purchases pu ON pp.purchase_id = pu.purchase_id WHERE pp.user_id = ?",
      [userId]
    );

    res.json({ success: true, row: rows });
  } catch (error) {
    console.log("address not found");
    console.error("Error getting address:", error);
    res.json({ success: false });
  }
});

// Endpoint to delete user data associated with a specific user_id
app.delete("/deleteUserData", async (req, res) => {
  try {
    const userId = req.session.userId;

    // Execute SQL queries to delete user data from each table
    await Promise.all([
      pool.query("DELETE FROM profiles WHERE user_id = ?", [userId]),
      pool.query("DELETE FROM feedback WHERE user_id = ?", [userId]),
      pool.query("DELETE FROM reviews WHERE user_id = ?", [userId]),
      pool.query("DELETE FROM cart WHERE user_id = ?", [userId]),
      pool.query("DELETE FROM purchase_products WHERE user_id = ?", [userId]),
      pool.query("DELETE FROM shipping_addresses WHERE user_id = ?", [userId]),
      pool.query("DELETE FROM billing_addresses WHERE user_id = ?", [userId]),
      pool.query("DELETE FROM purchases WHERE user_id = ?", [userId]),
      pool.query("DELETE FROM users WHERE user_id = ?", [userId]),
    ]);

    // Destroy the session after all queries have been executed
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting session" });
      } else {
        res.status(200).json({ message: "User data deleted successfully" });
      }
    });
  } catch (error) {
    console.error("Error deleting user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Admin Panel
app.get("/NumberOfPurchase", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT COUNT(*) AS purchase_count FROM purchases"
    );
    const purchaseCount = rows[0].purchase_count;
    console.log("Number of purchases:", purchaseCount);
    res.json({ success: true, purchaseCount });
  } catch (error) {
    console.error("Error getting purchase count:", error);
    res.json({ success: false, error: "Failed to retrieve purchase count" });
  }
});

app.get("/NumberOfUsers", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT COUNT(*) AS user_count FROM users");
    const userCount = rows[0].user_count;
    console.log("Number of Users:", userCount);
    res.json({ success: true, userCount });
  } catch (error) {
    console.error("Error getting Users count:", error);
    res.json({ success: false, error: "Failed to retrieve Users count" });
  }
});

app.get("/TotalProducts", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT COUNT(*) AS product_count FROM products"
    );
    const ProductCount = rows[0].product_count;
    console.log("Number of Products:", ProductCount);
    res.json({ success: true, ProductCount });
  } catch (error) {
    console.error("Error getting products count:", error);
    res.json({ success: false, error: "Failed to retrieve products count" });
  }
});
app.get("/GetAllFeedback", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "select name, email, phone_number, comment, created_at from feedback"
    );
    res.json({ success: true, rows });
  } catch (error) {
    console.error("Error getting feedback:", error);
    res.json({ success: false, error: "Failed to retrieve feedback" });
  }
});

//Check Server is listening
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
