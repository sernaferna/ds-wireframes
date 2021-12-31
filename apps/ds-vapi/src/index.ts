import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { getAllVersesRouter } from './routes/verses/getAll';

console.log('VAPI starting');

dotenv.config();

if (!process.env.PORT) {
  console.error('No listening port configured');
  process.exit();
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/vapi/v', [getAllVersesRouter]);

// TODO app.use(errorhandler)
// TODO app.use(notfoundhandler)

app.listen(PORT, () => {
  console.log(`VAPI started listening on port ${PORT}`);
});
