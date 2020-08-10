const superTest=require('supertest')
const app=require('../src/appTest.js')
const Wear=require('../src/models/wear.js')

test('Should create a Wear',async()=>{
    const response=await superTest(app).post('/wear').field({
        name:'Wallet'
    }).attach('img','tests/fixtures/cotton.jpg').expect(200)
})
