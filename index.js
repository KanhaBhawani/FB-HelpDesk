// app.js
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/DB");

dotenv.config();
connectDB();
const app = express();

// Middleware
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/hello", (req, res) => {
  res.send("hello..");
});
// Routes
const authRoutes = require("./routes/authRoutes");
const pageRoutes = require("./routes/pageRoutes");
const messageRoutes = require("./routes/messageRoutes");
const abcRoutes = require("./routes/abcRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/page", pageRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/abc", abcRoutes);

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === "abcdefgh") {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/webhook", (req, res) => {
  const body = req.body;
  console.log(body);

  if (body.object === "page") {
    body.entry.forEach((entry) => {
      if (entry.messaging) {
        console.log("hehehe");
        let webhook_event = entry.messaging[0];
        console.log(webhook_event.recipient.id);
        io.emit("/new_message", webhook_event);
      } else {console.log(entry.changes);}

      // Handle the webhook event (e.g., send response, update database)
    });

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
