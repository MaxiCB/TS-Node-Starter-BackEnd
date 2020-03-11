// const knex = require('knex');
// const knexConfig = require('../knexfile.js');

import knex from 'knex';
import { config } from '../knexfile'

export default knex(config.development);