const app=require('../src/appTest.js')
const superTest=require('supertest')
const Item=require('../src/models/item.js')


test('Should create a Item',async()=>{
    const response=await superTest(app).post('/item').field({
        name:'Wallet',
        price:50,
        category_id:'Wallet'
    }).attach('img','tests/fixtures/cotton.jpg').expect(200)
})