const request = require('supertest')
const app = require('../app')

describe('Get users', () => {
  it('should show all the users', async() => {
    const res = await request(app.callback())
      .get('/api/v1/users')
      .auth('ds', 'ds') // authenticating with an existing user
    expect(res.statusCode).toEqual(403)
  })
});