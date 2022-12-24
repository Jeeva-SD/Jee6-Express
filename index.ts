import express from 'express';
import cors from 'cors'
import { combineRouters } from './src/routes';
import { PORT } from './src/config';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

combineRouters(app);

app.listen(PORT, () => console.log(`jee6 from ${PORT}.`));