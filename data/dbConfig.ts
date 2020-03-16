// const knex = require('knex');
// const knexConfig = require('../knexfile.js');

import knex from 'knex';
const config = require('../knexfile.js')

export default knex(config.development);