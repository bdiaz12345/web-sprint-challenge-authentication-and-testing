// Write your tests here
const request = require("supertest")
const db = require("../data/dbConfig.js")
const server = require("./server.js")

const brandon = {username: "Brandon", password: 'Garcia'}

beforeAll(async ()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async ()=>{
    await db("users").truncate()
})

afterAll(async ()=>{
    await db.destroy()
})

describe("server", ()=>{
    describe("[GET] /jokes", ()=>{
        it("resopnds with 403 status if not user", async ()=>{
            const res = await request(server).get("/api/jokes")
            expect(res.status).toBe(403)
        })
    })
    describe("[POST] /users", ()=>{
        it("responds with  newly created user", async ()=>{
            let res
            res = await request(server).post("/api/auth/register").send(brandon)
            console.log(res.status)
            expect(res.status).toEqual(201)
        })
      })
      describe('[POST] /login', () => {
        it('responds with good status', async () => {
          await request(server).post('/api/auth/register').send(brandon)
          let res
          res = await request(server).post('/api/auth/login').send(brandon)
          expect(res.status).toEqual(200)
        })
    })
})
test('sanity', () => {
  expect(true).toBe(true)
})