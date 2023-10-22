import express from "express"
import http from "http"
import cors from "cors"

const app = express()
const port = 3000
const server = http.createServer(app)

app.use("/api/static", express.static('backend/static'))

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true
  })
);

app.get("/api/", (req, res) => {
  res.json({online: true})
})

server.listen(port, () => {
  console.log("Backend is up on port " + port)
})