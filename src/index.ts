import { Elysia } from "elysia";
import hello from "../routers/auth";
import mongoose from 'mongoose';
import { cors } from '@elysiajs/cors'
import { jwt } from '@elysiajs/jwt'

function databaseConnector() {
  mongoose.connect('mongodb+srv://darkness:123123123@cluster0.n52juyp.mongodb.net/ichat').then(() => {
    console.log(`Success connected to database`)
  }).catch(err => console.log(err))
}

databaseConnector()

const app = new Elysia()

app.use(cors())
app.use(
  jwt({
      name: 'jwt',
      secret: 'DARKNESS'
  })
)

app.use(hello)

app.listen(8888)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
