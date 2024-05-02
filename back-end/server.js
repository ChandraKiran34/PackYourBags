import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger.js';
import rfs from "rotating-file-stream";


import authRoutes from './routes/TravellerAuthenticate.js';
import guideRoutes  from './routes/GuideAuthenticate.js';
import hotelRoutes  from './routes/HotelAuthenticate.js';
import agencyRoutes from './routes/AgencyAuthenticate.js'
import destinationRoutes  from './routes/DestinationRoute.js';
import tripRoutes from './routes/TripRoutes.js';
import adminRoutes from './routes/AdminRoute.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({
    origin: ["http://localhost:3000","http://3.108.54.68:3000","https://pack-your-bags-three.vercel.app/"],
    methods: ["POST", "GET", "HEAD", "PUT", "DELETE"],
    credentials: true,
  }));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// File upload
app.use('/auth', authRoutes);
app.use('/guide',guideRoutes);
app.use('/hotel',hotelRoutes);
app.use('/agency',agencyRoutes);
app.use('/destinations',destinationRoutes);
app.use('/trips', tripRoutes);
app.use('/admin',adminRoutes);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const errorHandler = (err,req,res,next)=>{
  console.log("ehere")
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  switch(statusCode){
      case 401:
          res.json({
              title:"Unauthorized",
              message:err.message
          });
          break;
      case 404:
          res.json({
              title:"Not Found",
              message:err.message
          })
          break;
      case 500:
          res.json({
              title:"Server error",
              message:err.message
          })
          break;
      default:
          break;

  }
  next();
}

// app.use('/guide/:guideId/dashboard',errorHandler);
app.use((err,req,res,next)=>{
  console.log("ehere")
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  switch(statusCode){
      case 401:
          res.json({
              title:"Unauthorized",
              message:err.message
          });
          break;
      case 404:
          res.json({
              title:"Not Found",
              message:err.message
          })
          break;
      case 500:
          res.json({
              title:"Server error",
              message:err.message
          })
          break;
      default:
          break;

  }
  next();
});

// Create a write stream for logging
// const accessLogFile = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
// accessLogFile.on('error', (err) => {
//   console.error('Error creating write stream:', err);
// });



// app.use(morgan('combined', { stream: accessLogFile }));

// var accesslogStream = rfs.createStream("access.log", {
//   interval: "1h",
//   path: "./log",
// });

// app.use(morgan("combined", { stream: accesslogStream }));

const PORT = process.env.PORT || 9000;

// comment when testing is once done
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log('running db');
//   })
//   .catch((err) => console.log(`error : ${err}`));

export default app;