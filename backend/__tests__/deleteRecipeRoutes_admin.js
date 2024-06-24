const request = require('supertest')
const app = require('../app')

describe('Delete recipe', () => {
  it('should delete a recipe', async() => {
    const res = await request(app.callback())
      .delete('/api/v1/recipes/11')
      .auth('hello', 'hello') // admins can delete recipes regardless of whether it is theirs
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('deleted', true)
  })
});