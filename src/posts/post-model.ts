
import db from '../../data/dbConfig'

export const find = () => {
  return db("posts");
}

export const findById = (id: number) => {
  return db("posts")
    .where({ id })
    .first();
}

export const findByUserID = (id: number) => {
  return db("posts")
    .select('p.*')
    .from('posts as p')
    .where({author_id: id})
    .orderBy('p.id')
}

export const findByPartial = (string: string) => {
  return db("posts")
    .select('*')
    .where('post_title', 'like', `%${string}%`)
    .orWhere('post_content', 'like', `%${string}%`)
    .orderBy('id')
}

export const add = (data: object) => {
  return db("posts").insert(data);
}

export const update = (changes: any, id: number) => {
  return db("posts")
    .where({ id })
    .update(changes);
}

export const remove = (id: number) => {
  return db("posts")
    .where({ id })
    .del();
}
