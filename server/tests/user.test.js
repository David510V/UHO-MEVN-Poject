const superTest=require('supertest')
const {setUpDatabase, userId, userOne}=require('./fixtures/db.js')
const app=require('../src/appTest.js')
const User=require('../src/models/user.js')

beforeEach(setUpDatabase)

test('Should create a user',async()=>{
   const response= await superTest(app).post('/user').send({
        nickname:'David',
        email:"o@gmail.com",
        password:"1234568"
    }).expect(201)
})

test('Should Log in User',async()=>{
    const response=await superTest(app).post('/user/login').send({
        email:"solo@gmail.com",
        password:"1234567",
    }).expect(200)
    const user=await User.findById(userId)
    expect(response.body.tokens[0].token).toBe(user.tokens[0].token)
})

test('Should Log out User',async()=>{
    await superTest(app).post('/user/logout').set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .expect(200)
})

