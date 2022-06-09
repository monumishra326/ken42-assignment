import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const connect = require("./configs/db");
//import routes
import StudentRoutes from './routes/StudentRoutes.js'
import CalenderRoutes from './routes/CalenderRoutes.js'
import AdminRoutes from './routes/AdminRoutes.js'



const app = express();
const port = process.env.PORT || 8080;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());
app.use(express.static("./consumerPhotos"));

//routes
app.get('/', (req,res) => {
    res.send('welcome to api')
  })
  
app.use("students", StudentRoutes);
app.use("calender", CalenderRoutes);
app.use("admin", AdminRoutes);




  
app.listen(port, async function () {
  await connect();

  console.log("listening to port:", port);
});