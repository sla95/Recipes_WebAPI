const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const auth = require('../controllers/auth');
const can = require('../permissions/recipes');

const recipes = require('../models/recipes');

const {validateRecipe} = require('../controllers/validation');


const router = Router({prefix: '/api/v1/recipes'});

//routes for recipes
router.get('/', getAll);
router.post('/', auth, bodyParser(), validateRecipe, createRecipe);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateRecipe, updateRecipe);
router.del('/:id([0-9]{1,})', auth, deleteRecipe);

async function getAll(ctx) {
  const {page=1, limit=150, order="ID", direction='ASC'} = ctx.request.query;
  const result = await recipes.getAll(page, limit, order, direction);
  if (result.length) {
    const body = result.map(post => {
      // extract post fields to be sent back
      const {ID, diet, recipe, userID} = post;
      // links for HATEOAS compliance
      // clients can follow these to find related resources
      const links = {
        self: `${ctx.protocol}://${ctx.host}${'/api/v1/recipes'}/${post.ID}`
      }
      return {ID, diet, recipe, userID, links};
    });
    ctx.body = result;
  }
}

async function getById(ctx) {
  const id = ctx.params.id;
  const result = await recipes.getById(id);
  if (result.length) {
    const recipe = result[0];
    ctx.body = recipe;
  }
}

async function createRecipe(ctx) {
  const body = ctx.request.body;
  const result = await recipes.add(body);
  if (result.affectedRows) {
    const id = result.insertId;
    ctx.status = 201;
    ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
  }
}

async function updateRecipe(ctx) {
  const id = ctx.params.id;
  let result = await recipes.getById(id);  // check it exists
  if (result.length) {
    let recipe = result[0];
    const permission = can.update(ctx.state.user, recipe);
    if (!permission.granted) {
      ctx.status = 403;
    } else {
      // exclude fields that should not be updated
      const {ID, userID, ...body} = ctx.request.body;
      // overwrite updatable fields with remaining body data
      Object.assign(recipe, body);
      result = await recipes.update(recipe);
      if (result.affectedRows) {
        ctx.body = {ID: id, updated: true, link: ctx.request.path};
      }
    }
  }
}

async function deleteRecipe(ctx) {
  const permission = can.delete(ctx.state.user);
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    const id = ctx.params.id;
    const result = await recipes.delById(id);
    if (result.affectedRows) {
      ctx.body = {ID: id, deleted: true}
    }
  }
}

module.exports = router;