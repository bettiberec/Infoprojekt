const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const BOOKINGS_FILE = path.join(__dirname, "bookings.json");
const ROOMS_FILE = path.join(__dirname, "rooms.json");

//JSON beolvasás
function readJsonFile(path) {
  const data = fs.readFileSync(path, "utf-8");
  return JSON.parse(data);
}

//JSON mentés
function writeJsonFile(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2), "utf-8");
}

//Teszt endpoint
app.get("/", (req, res) => {
  res.send("Szerver működik");
});

//API hívások

// 1. GET /api/rooms
app.get("/api/rooms", (req, res) => {
  const rooms = readJsonFile(ROOMS_FILE);
  res.json(rooms);
});

// 2. GET /api/bookings
app.get("/api/bookings", (req, res) => {
  const bookings = readJsonFile(BOOKINGS_FILE);
  res.json(bookings);
});

// 3. POST /api/bookings
app.post("/api/bookings", (req, res) => {
  const bookings = readJsonFile(BOOKINGS_FILE);

  const roomId = String(req.body.roomId).trim();
  const date = String(req.body.date).trim();
  const time = String(req.body.time).trim();

  const existingBooking = bookings.find(booking =>
    String(booking.roomId).trim() === roomId &&
    String(booking.date).trim() === date &&
    String(booking.time).trim() === time
  );
  if (existingBooking) {
    return res.status(409).json({
      message: "Ez az időpont már foglalt."
    });
  }

  const guests = Number(req.body.guests);

  const newBooking = {
    id: Date.now().toString(),
    roomId,
    date,
    time,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    guests,
    note: req.body.note || "",
    bookingType: "normal",
    paymentMethod: "none",
    price: guests * 6000,
    status: "booked",
    createdBy: "user",
    createdAt: new Date().toISOString()
  };

  bookings.push(newBooking);
  writeJsonFile(BOOKINGS_FILE, bookings);

  res.status(201).json({
    message: "Foglalás sikeresen mentve",
    booking: newBooking
  });
});

app.listen(PORT, () => {
  console.log(`Server fut: http://localhost:${PORT}`);
  console.log("BOOKINGS_FILE:", BOOKINGS_FILE);
});

//Időpontok lekérdezése
function getAllPossibleSlots(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();

  const weekendSlots = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30", "21:00"];
  const weekdaySlots = ["13:30", "15:00", "16:30", "18:00", "19:30", "21:00"];

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return weekendSlots;
  }
  return weekdaySlots;
}

// 4. GET /api/slots?roomId=...&date=...
app.get("/api/slots", (req, res) => {
  const { roomId, date } = req.query;

  if (!roomId || !date) {
    return res.status(400).json({
      message: "A roomId és a date megadása kötelező."
    });
  }

  const bookings = readJsonFile(BOOKINGS_FILE);
  const allSlots = getAllPossibleSlots(date);

  const bookedTimes = bookings
    .filter(booking => booking.roomId === roomId && booking.date === date)
    .map(booking => booking.time);

  const slots = allSlots.map(time => ({
    time,
    available: !bookedTimes.includes(time)
  }));

  res.json({
    roomId,
    date,
    slots
  });
});