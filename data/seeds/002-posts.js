
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {post_title: 'Example Title', author_id: 1, post_content: 'john@doe.com post content'},
        {post_title: 'Example Title', author_id: 1, post_content: 'sally@sue.com post content'},
        {post_title: 'Example Title', author_id: 1, post_content: 'mark@johnson.com post content'},
        {post_title: 'Example Title', author_id: 2, post_content: 'james@smith.com post content'},
        {post_title: 'Example Title', author_id: 2, post_content: 'robert@brown.com post content'}
      ]);
    });
};
