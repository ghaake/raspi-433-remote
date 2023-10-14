import express from 'express';

import statesRoutes from "./api/routes/states";
import commandRoutes from "./api/routes/commands";

import { config } from "dotenv";

config();

const app = express();
const port = process.env.PORT || 8080;

app.use( express.json() )

app.use( statesRoutes );
app.use( commandRoutes );

app.listen( port, () => console.log('Example app is listening on port: ' + port));