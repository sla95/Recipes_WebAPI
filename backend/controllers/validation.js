/**
 * A module to run JSON Schema based validation on request/response data.
 * @module controllers/validation
 * @author Shrikar Akkenapragada
 * @see schemas/* for JSON Schema definition files
 */

const {Validator, ValidationError} = require('jsonschema');

const recipeSchema = require('../schemas/recipe.json').definitions.recipe;
const userSchema = require('../schemas/user.json').definitions.user;
const userUpdateSchema = require('../schemas/user.json').definitions.userUpdate;

/**
 * Wrapper that returns a Koa middleware validator for a given schema.
 * @param {object} schema - The JSON schema definition of the resource
 * @param {string} resource - The name of the resource e.g. 'recipe'
 * @returns {function} - A Koa middleware handler taking (ctx, next) params
 */

//exports.validateRecipe = async (ctx, next) => {
const makeKoaValidator = (schema, resource) => {

  const v = new Validator();
  const validationOptions = {
    throwError: true,
    //allowUnknownAttributes: false
    propertyName: resource
  };
  
  /**
   * Koa middleware handler function to do validation
   * @param {object} ctx - The Koa request/response context object
   * @param {function} next - The Koa next callback
   * @throws {ValidationError} a jsonschema library exception
   */

  const handler = async (ctx, next) => {
    
    const body = ctx.request.body;

    try {
      v.validate(body, schema, validationOptions);
      await next();
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error(error);
        ctx.status = 400
        ctx.body = error;      
      } else {
        throw error;
      }
    }
  }
  return handler;
}

/** Validate data against recipe schema */
exports.validateRecipe = makeKoaValidator(recipeSchema, 'recipe');

/** Validate data against user schema for creating new users */
exports.validateUser = makeKoaValidator(userSchema, 'user');

/** Validate data against user schema for updating existing users */
exports.validateUserUpdate = makeKoaValidator(userUpdateSchema, 'userUpdate');

// data validation