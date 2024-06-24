const db = require('../helpers/database');

//get a recipe by its id  
exports.getById = async function getById (id) {
  let query = "SELECT * FROM recipes WHERE ID = ?;";
  let values = [id];
  let data = await db.run_query(query, values);
  return data;
}

//list all the recipes in the database
exports.getAll = async function getAll (page, limit, order, direction) {
  const offset = (page - 1) * limit;
  let query;
  if (direction === 'DESC') {
    query = "SELECT * FROM recipes ORDER BY ?? DESC LIMIT ? OFFSET ?;";
  } else {
    query = "SELECT * FROM recipes ORDER BY ?? ASC LIMIT ? OFFSET ?;";    
  }
  const values = [order, parseInt(limit), parseInt(offset)];
  const data = await db.run_query(query, values);
  return data;
}

//create a new recipe in the database
exports.add = async function add (recipe) {
  const query = "INSERT INTO recipes SET ?";
  const data = await db.run_query(query, recipe);
  return data;
}

//delete a recipe by its id
exports.delById = async function delById (id) {
  const query = "DELETE FROM recipes WHERE ID = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

//update a recipe 
exports.update = async function update (recipe) {
  const query = "UPDATE recipes SET ? WHERE ID = ?;";
  const values = [recipe, recipe.ID];
  const data = await db.run_query(query, values);
  return data;
}