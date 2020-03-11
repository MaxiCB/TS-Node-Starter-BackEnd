const db = require("../../data/dbConfig");

// module.exports = {
//   find,
//   findById,
//   add,
//   update,
//   remove
// };

export const find = () => {
  return db("accounts");
}

export const findById = (id: number) => {
  return db("accounts")
    .where({ id })
    .first();
}

export const add = (data: object) => {
  return db("accounts").insert(data);
}

export const update = (changes: object, id: number) => {
  return db("accounts")
    .where({ id })
    .update(changes);
}

export const remove = (id: number) => {
  return db("accounts")
    .where({ id })
    .del();
}
