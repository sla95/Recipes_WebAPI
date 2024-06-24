const request = require('supertest')
const app = require('../app')

describe('Get users', () => {
  it('should show all the users', async() => {
    const res = await request(app.callback())
      .get('/api/v1/users')
      .auth('sk', 'sk') // authenticating with an existing admin
    expect(res.statusCode).toEqual(200)
    //expect(res.body).toHaveProperty('created', true)
  })
});