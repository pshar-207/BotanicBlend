# E-Commerce Website

An e-commerce platform for buying and selling products online, built with **Node.js** and **MySQL**.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Project Structure](#project-structure)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

---

## Overview

This is a full-stack e-commerce website where users can browse products by categories and skin-type, add items to their cart, and make purchases. The project features a user-friendly interface for customers.

## Features

- **User Features:**
  - Browse products by categories and skin-type.
  - Add/remove items to/from shopping cart.
  - View order history.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Frontend:** HTML, CSS, JavaScript
- **Hosting:** Render

## Installation

### Prerequisites

- **Node.js** (v12+)
- **MySQL** (v5.7+)
- **Git** (for version control)

### Steps

1. Clone the repository:

   First, clone the project to your local machine and navigate to the project directory.

   git clone https://github.com/pshar-207/BotanicBlend.git
   cd e-commerce-website

2. Install dependencies:

   Install all the required Node.js packages.

   npm install

3. Set up the MySQL database:

   Create a new MySQL database locally.
   Update the config/database.js file (or .env file, if applicable) with your MySQL credentials:

   const pool = mysql.createPool({
   host: 'your-database-host',
   user: 'your-database-username',
   password: 'your-database-password',
   database: 'your-database-name'
   });

4. Run database migrations (if applicable):

   npm run start

5. Access the application:

   Open your browser and navigate to http://localhost:3000 to view the e-commerce website.

## Usage

### User Side:

- Create an account or log in.
- Browse products and add them to the cart.
- Take a Quiz to get products according to your skin-type.
- Proceed to checkout and make payments.

## Project Structure

```bash
/BotanicBlend
|-- /client
|   |-- /other pages
|   |   |-- /CSS            # Folder for all CSS files
|   |   |-- /JavaScript     # Folder for all JavaScript files
|   |   |-- /Photos         # Folder for storing photos
|   |   |-- *.html          # All other HTML files
|   |-- app.js              # JavaScript for Index.html page
|   |-- Index.html          # Main HTML file
|-- /node_modules           # Dependencies installed by npm
|-- .gitignore               # Git ignore file
|-- app.js                  # Main backend application file
|-- package-lock.json       # Lock file for package dependencies
|-- package.json            # Project metadata and dependencies
|-- README.md               # Documentation for the project
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:

```bash
   git commit -m 'Add some feature'
```

4. Push to the branch:

```bash
   git push origin feature-branch
```

5. Create a new Pull Request.

## License

This project is intended for personal use and is based on products sold locally by **Hriti Arora**, owner of the brand **BotanicBlend**.

For any inquiries, please contact **Hriti Arora** at:

- **Instagream:** https://instagram.com/botanicblend

## Contact

If you have any questions, feel free to contact me at:

- **Email:** praveensharma917@gmail.com
- **GitHub:** https://github.com/pshar-207
