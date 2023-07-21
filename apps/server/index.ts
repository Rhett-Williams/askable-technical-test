import fastify from 'fastify';

import { Database } from './data/Database';

const app = fastify();
const port = 3000;

app.post('/products', async (req, res) => {
  res.send(Database.getProducts());
});

app.listen({ port }, () => {
  console.log(`Listening on port ${port}`);
});
