const request = require('supertest')
const app = require('../app')

describe('Put recipe', () => {
  it('should update a recipe', async() => {
    const res = await request(app.callback())
      .put('/api/v1/recipes/1')
      .auth('wolf', 'wolf') // authenticating with an existing user
      .send({
        ID: 1,
        diet: 'vegan',
        recipe: 'tomato pasta',
        userID: 5
      });
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('updated', true)
  })
});