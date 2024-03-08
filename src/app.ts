import Express, { Request, Response } from 'express';

const app = Express();

type User = {
  id: number,
  name: string,
  age: number,
  cpf: string
}

app.get('/', (req: Request, res: Response) => res.json({ message: 'Hello world!' }));

export default app;