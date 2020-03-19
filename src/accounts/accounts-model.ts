import db from "../../data/dbConfig";

export const find = () => {
  return db("accounts")
    .column('id', 'email', 'first_name', 'last_name', 'profileImage')
    .orderBy('id')
};

export const findByEmail = (email: string) => {
  return db("accounts")
    .where({ email })
    .first();
};

export const findByEmailPartial = (email: string) => {
  return db("accounts")
  // .select('*')
  .where('email', 'like', `%${email}%`)
  .column('id', 'email', 'first_name', 'last_name', 'profileImage')
  .orderBy('id')
};

export const findById = (id: number) => {
  return db("accounts")
    .where({ id })
    .column('id', 'email', 'first_name', 'last_name', 'profileImage')
    .first();
};

export const findByPartial = (string: string) => {
  return db("accounts")
    // .select('*')
    .where('first_name', 'like', `%${string}%`)
    .orWhere('last_name', 'like', `%${string}%`)
    .column('id', 'email', 'first_name', 'last_name', 'profileImage')
    .orderBy('id')
}

export const add = (data: object) => {
  return db("accounts").insert(data);
};

export const update = (changes: object, id: number) => {
  return db("accounts")
    .where({ id })
    .update(changes);
};

export const remove = (id: number) => {
  return db("accounts")
    .where({ id })
    .del();
};
