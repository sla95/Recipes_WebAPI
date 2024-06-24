const request = require('supertest')
const app = require('../app')

describe('Put recipe', () => {
  it('should update a recipe', async() => {
    const res = await request(app.callback())
      .put('/api/v1/recipes/10')
      .auth('lynx', 'lynx') // authenticating with an existing user, who has created this recipe
      .send({
        ID: 10,
        diet: 'vegetarian',
        recipe: 'dosa',
        userID: 6
      });
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('updated', true)
  })
});