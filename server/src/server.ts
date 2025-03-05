import path from "path";
import server from "./app";

const PORT: number = 5001;

server.listen(PORT, () =>
  console.log(`Sever is running on http://localhost:${PORT}`)
);
