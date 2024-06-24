const AccessControl = require('role-acl');
const ac = new AccessControl();

// controls for specific CRUD operations on 'recipe records
// don't let users update a recipeID 
ac
  .grant('user')
  .condition({Fn:'EQUALS', args: {'requester':'$.owner'}})
  .execute('update')
  .on('recipe');

ac
  .grant('user')
  .condition({Fn:'EQUALS', args: {'requester':'$.owner'}})
  .execute('delete')
  .on('recipe');

ac
  .grant('admin')
  .execute('delete')
  .on('recipe');

ac
  .grant('admin')
  .execute('update')
  .on('recipe');

exports.update = (requester, data) => {
    console.log(requester)
    console.log(data)
  return ac
    .can(requester.role)
    .context({requester:requester.ID, owner:data.userID})
    .execute('update')
    .sync()
    .on('recipe');
}

exports.delete = (requester) => {
  return ac
    .can(requester.role)
    .execute('delete')
    .sync()
    .on('recipe');
}
