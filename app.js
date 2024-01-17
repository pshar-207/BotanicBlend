const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Add these lines after creating the express app
const session = require("express-session");

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

// MySQL database connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "botanic@123",
  database: "BotanicBlend",
});

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
  console.log("enterd");
  try {
    // Check if the user is already authenticated
    if (req.session.isAuthenticated) {
      return res.status(400).json({ message: "User is already logged in" });
    }
    // Get form data from the request body
    const { fname, lname, email, password } = req.body;

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
    //res.json({ message: "User created successfully" }); // Send a success response
    res.redirect(`index.html?successMessage=User created successfully`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user"); // Send an error response
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
      "SELECT * FROM profiles WHERE user_id = ?",
      [userId]
    );

    if (existingProfile.length > 0) {
      // If the user already has a profile, show an alert that the DOB is already added
      res.json({ success: false, message: "Date of birth already added" });
    } else {
      // If the user doesn't have a profile, insert a new row with the date of birth
      await pool.query(
        "INSERT INTO profiles (user_id, birthday) VALUES (?, ?)",
        [userId, newDob]
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
      "SELECT products.image_url,products.name,products.rating,MIN(product_variations.price) AS price FROM products INNER JOIN product_variations ON products.id = product_variations.product_id GROUP BY products.image_url,products.name,products.rating,products.date ORDER BY products.date desc limit 4;"
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
      "SELECT products.image_url,products.name,products.rating,MIN(product_variations.price) AS price FROM products INNER JOIN product_variations ON products.id = product_variations.product_id WHERE products.best_seller = TRUE GROUP BY products.image_url,products.name,products.rating limit 4;"
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
      "SELECT products.image_url,products.name,products.description,products.rating,MIN(product_variations.price) AS price FROM products INNER JOIN product_variations ON products.id = product_variations.product_id GROUP BY products.image_url,products.name,products.description,products.rating;"
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
      "SELECT products.image_url,products.name,products.description,products.rating,MIN(product_variations.price) AS price FROM products INNER JOIN product_variations ON products.id = product_variations.product_id WHERE products.best_seller = TRUE GROUP BY products.image_url,products.name,products.description,products.rating;"
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
      "SELECT products.image_url,products.name,products.description,products.rating,MIN(product_variations.price) AS price FROM products INNER JOIN product_variations ON products.id = product_variations.product_id GROUP BY products.image_url,products.name,products.description,products.rating,products.date ORDER BY products.date desc limit 8;"
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
      "SELECT products.image_url,products.name,products.description,products.rating,MIN(product_variations.price) AS price FROM products INNER JOIN product_variations ON products.id = product_variations.product_id where products.category = 'Creams' GROUP BY products.image_url,products.name,products.description,products.rating;"
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
      "SELECT products.image_url,products.name,products.description,products.rating,MIN(product_variations.price) AS price FROM products INNER JOIN product_variations ON products.id = product_variations.product_id where products.category = 'gels' GROUP BY products.image_url,products.name,products.description,products.rating;"
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
      "SELECT products.image_url,products.name,products.description,products.rating,MIN(product_variations.price) AS price FROM products INNER JOIN product_variations ON products.id = product_variations.product_id where products.category = 'bathing' GROUP BY products.image_url,products.name,products.description,products.rating;"
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
      "SELECT products.image_url,products.name,products.description,products.rating,MIN(product_variations.price) AS price FROM products INNER JOIN product_variations ON products.id = product_variations.product_id where products.category = 'bodyCare' GROUP BY products.image_url,products.name,products.description,products.rating;"
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
      "SELECT products.image_url,products.name,products.description,products.rating,MIN(product_variations.price) AS price FROM products INNER JOIN product_variations ON products.id = product_variations.product_id where products.Dry = 1 GROUP BY products.image_url,products.name,products.description,products.rating;"
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
      "SELECT products.image_url,products.name,products.description,products.rating,MIN(product_variations.price) AS price FROM products INNER JOIN product_variations ON products.id = product_variations.product_id where products.Oily = 1 GROUP BY products.image_url,products.name,products.description,products.rating;"
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
      "SELECT products.image_url,products.name,products.description,products.rating,MIN(product_variations.price) AS price FROM products INNER JOIN product_variations ON products.id = product_variations.product_id where products.Normal = 1 GROUP BY products.image_url,products.name,products.description,products.rating;"
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

    if (req.session.isAuthenticated) {
      const userId = req.session.userId;
      await pool.query(
        "INSERT INTO feedback (user_id, name, email, phone_number, comment) VALUES (?, ?, ?, ?, ?)",
        [userId, name, email, phoneNumber, comment]
      );

      res.json({ success: true, message: "Feedback submitted successfully" });
    } else {
      // const [result] = await pool.query(
      //   "INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)",
      //   [name, "", email]
      // );

      // const newUserId = result.insertId;

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
      "SELECT p.image_url, p.another_img_url, p.name, p.rating, p.description, pv.size, pv.price, pd.KeyIngredients, pd.Features, pd.HowToUse, pd.Caution FROM products p JOIN product_variations pv ON p.id = pv.product_id JOIN product_description pd ON p.id = pd.product_id WHERE p.name = ?;",
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
    // Assuming you have a 'reviews' table with columns 'user_id', 'rating', 'title', 'body', 'product_id'
    const { rating, title, body, product_Name } = req.body;
    const userId = req.session.userId; // Assuming you have stored the user ID in the session

    // Replace 'your-product-id' with the actual product ID for which the review is being submitted

    const productIdResult = await pool.query(
      "SELECT id FROM products WHERE name = ?",
      [product_Name]
    );

    const productId = productIdResult[0][0].id;

    console.log(product_Name);
    console.log(productId);
    console.log(userId);
    console.log(rating);
    console.log(title);
    console.log(body);

    // Insert the review into the database
    const [result] = await pool.query(
      "INSERT INTO reviews (user_id, product_id,user_rating, title, body) VALUES (?, ?, ?, ?, ?)",
      [userId, productId, rating, title, body]
    );
    console.log("sdfds");
    // Next, perform the UPDATE query
    const [updateResult] = await pool.query(
      "UPDATE products SET rating = (SELECT AVG(user_rating) FROM reviews WHERE product_id = ?) WHERE id = ?",
      [productId, productId]
    );

    res.json({ success: true });
  } catch (error) {
    console.log("review not submited");
    console.error("Error submitting review:", error);
    res.json({ success: false });
  }
});

// Endpoint to get reviews
app.get("/getReviews", async (req, res) => {
  try {
    // Replace 'your-product-id' with the actual product ID for which reviews are being retrieved
    const productId = "your-product-id";

    // Assuming you have a 'reviews' table with columns 'user_id', 'rating', 'title', 'body', 'created_at'
    const [rows] = await pool.query(
      "SELECT user_id, rating, title, body, created_at FROM reviews WHERE product_id = ?",
      [productId]
    );

    // You might want to fetch additional details like user names based on 'user_id'

    res.json({ reviews: rows });
  } catch (error) {
    console.error("Error getting reviews:", error);
    res.json({ reviews: [] });
  }
});

//Check Server is listening
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
