  // server.js
  import express from "express";
  import pkg from "pg";
  import dotenv from "dotenv";
  import cors from "cors";


  dotenv.config();
  const { Pool } = pkg;

  const app = express();
  app.use(cors());   
  app.use(express.json());

  // PostgreSQL connection
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL"))
    .catch(err => console.error("❌ Connection error", err));

  // ---------------- CRUD ROUTES ---------------- //

  // --------- USERS --------- //
  // app.get("/", (req, res) => {
  //   res.send("Hello World! Server is working!");
  // });
  // GET all users
  app.get("/users", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM users ORDER BY user_id ASC");
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

  // POST new user
  app.post("/users", async (req, res) => {
    try { 
      const { username, password } = req.body; 
      const result = await pool.query(
        "INSERT INTO users ( username, password) VALUES ($1, $2) RETURNING *",
        [ username, password]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

  // --------- CHEFS --------- //

  // GET all chefs
  app.get("/chefs", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM chefs ORDER BY chef_id ASC");
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

  // POST new chef
  app.post("/chefs", async (req, res) => {
    try {
      const { chefName, description, picture } = req.body;
      const result = await pool.query(
        "INSERT INTO chefs (chefName, description, picture) VALUES ($1, $2, $3) RETURNING *",
        [chefName, description, picture]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

  // --------- FOODS --------- //

  // GET all foods
  app.get("/foods", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM foods ORDER BY food_id ASC");
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

  // POST new food
  app.post("/foods", async (req, res) => {
    try {
      const { foodName, chef_id, time, category, description, likecount} = req.body;
      const result = await pool.query(
        `INSERT INTO foods 
        (foodname, chef_id, time, category, description, likecount) 
        VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
        [foodName, chef_id, time, category, description, likecount]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

  // --------- USER LIKED FOODS --------- //

  app.post("/user-liked-foods", async (req, res) => {
    try {
      const { user_id, food_id } = req.body;
      const result = await pool.query(
        "INSERT INTO user_liked_foods (user_id, food_id) VALUES ($1, $2) RETURNING *",
        [user_id, food_id]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

  // DELETE liked food
  app.delete("/user-liked-foods", async (req, res) => {
    try {
      const { user_id, food_id } = req.body;
      const result = await pool.query(
        "DELETE FROM user_liked_foods WHERE user_id=$1 AND food_id=$2 RETURNING *",
        [user_id, food_id]
      );
      if (!result.rows[0]) return res.status(404).send("Like not found");
      res.json({ message: "Like removed", data: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

  // --------- USER LIKED CHEFS --------- //

  app.post("/user-liked-chefs", async (req, res) => {
    try {
      const { user_id, chef_id } = req.body;
      const result = await pool.query(
        "INSERT INTO user_liked_chefs (user_id, chef_id) VALUES ($1, $2) RETURNING *",
        [user_id, chef_id]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

  app.delete("/user-liked-chefs", async (req, res) => {
    try {
      const { user_id, chef_id } = req.body;
      const result = await pool.query(
        "DELETE FROM user_liked_chefs WHERE user_id=$1 AND chef_id=$2 RETURNING *",
        [user_id, chef_id]
      );
      if (!result.rows[0]) return res.status(404).send("Like not found");
      res.json({ message: "Like removed", data: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

  app.get("/chefs/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const result = await pool.query("SELECT * FROM chefs WHERE chef_id=$1", [id]);
      if (result.rows.length === 0) {
        return res.status(404).send("Chef not found");
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });
  
  // GET нэг хэрэглэгч + түүний liked foods/chefs
  app.get("/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const userId = id;
    try {
      const userResult = await pool.query(
        "SELECT user_id, username FROM users WHERE user_id=$1",
        [userId]
      );

      if (userResult.rows.length === 0) {
        return res.status(404).send("User not found");
      }

      const likedFoods = await pool.query(
        "SELECT food_id FROM user_liked_foods WHERE user_id=$1",
        [userId]
      );

      const likedChefs = await pool.query(
        "SELECT chef_id FROM user_liked_chefs WHERE user_id=$1",
        [userId]
      );

      const user = userResult.rows[0];
      user.liked_foods = likedFoods.rows.map(r => r.food_id);
      user.liked_chefs = likedChefs.rows.map(r => r.chef_id);

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

  app.post("/like-chef", async (req, res) => {
    try {
      const { user_id, chef_id } = req.body;
      const result = await pool.query(
        "INSERT INTO user_liked_chefs (user_id, chef_id) VALUES ($1, $2) RETURNING *",
        [user_id, chef_id]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }     
  });

  app.delete("/unlike-chef", async (req, res) => {
    try {
      const { user_id, chef_id } = req.body;
      const result = await pool.query(
        "DELETE FROM user_liked_chefs WHERE user_id=$1 AND chef_id=$2 RETURNING *",
        [user_id, chef_id]
      );
      if (!result.rows[0]) return res.status(404).send("Like not found");
      res.json({ message: "Like removed", data: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    } 
  });

  app.post("/like-food", async (req, res) => {
    try {
      const { user_id, food_id } = req.body;
      const result = await pool.query(
        "INSERT INTO user_liked_foods (user_id, food_id) VALUES ($1, $2) RETURNING *",
        [user_id, food_id]
      );
      res.status(201).json(result.rows[0]);
    }

    catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });
  app.delete("/unlike-food", async (req, res) => {
    try {
      const { user_id, food_id } = req.body;
      const result = await pool.query(
        "DELETE FROM user_liked_foods WHERE user_id=$1 AND food_id=$2 RETURNING *",
        [user_id, food_id]
      );
      if (!result.rows[0]) return res.status(404).send("Like not found");
      res.json({ message: "Like removed", data: result.rows[0] });
    }
    catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });



  // Start server
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
