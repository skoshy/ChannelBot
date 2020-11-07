import * as express from 'express';

const server = express();

server.all('/', (req, res)=>{
  res.send('Your bot is alive!')
});

export function keepAlive() {
  server.listen(3000, () => {
    console.log("Server is Ready!")
  });
};