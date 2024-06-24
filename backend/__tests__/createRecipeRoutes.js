const request = require('supertest')
const app = require('../app')

describe('Post recipe', () => {
  it('should create a new recipe', async() => {
    const res = await request(app.callback())
      .post('/api/v1/recipes')
      .auth('lynx', 'lynx') // authenticating with an existing user
      .send({
        ID: 12,
        diet: 'vegan',
        recipe: 'falafel',
        userID: 5
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('created', true)
  })
});