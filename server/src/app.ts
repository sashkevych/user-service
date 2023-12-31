import cors from 'cors';
import express from "express";


import { ErrorHandler } from './middleware/ErrorHandler.js';

import actions from './routes/actions.router.js';
import api from "./routes/api.router.js";
import auth from "./routes/auth.router.js";

export const app = express();


app.use(cors())
app.use(express.json());

app.use("/auth", auth);
app.use("/api", api);
app.use("/actions", actions);

app.use(ErrorHandler)

