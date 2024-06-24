const request = require('supertest')
const app = require('../app')

describe('Delete user', () => {
  it('should delete a user', async() => {
    const res = await request(app.callback())
      .delete('/api/v1/users/14')
      .auth('ik', 'ik') // admins can delete recipes regardless of whether it is theirs
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('deleted', true)
  })
});