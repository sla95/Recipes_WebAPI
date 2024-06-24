const request = require('supertest')
const app = require('../app')

describe('Get recipes', () => {
  it('should delete a recipe', async() => {
    const res = await request(app.callback())
      .get('/api/v1/recipes/')
      .auth('bsc', 'bsc') // authenticating with an existing user, who has created this recipe
    expect(res.statusCode).toEqual(200)
  })
});