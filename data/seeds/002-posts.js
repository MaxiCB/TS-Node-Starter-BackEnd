
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {post_title: 'Example Title', post_author: 'john@doe.com', post_content: 'john@doe.com post content'},
        {post_title: 'Example Title', post_author: 'sally@sue.com', post_content: 'sally@sue.com post content'},
        {post_title: 'Example Title', post_author: 'mark@johnson.com', post_content: 'mark@johnson.com post content'},
        {post_title: 'Example Title', post_author: 'james@smith.com', post_content: 'james@smith.com post content'},
        {post_title: 'Example Title', post_author: 'robert@brown.com', post_content: 'robert@brown.com post content'}
      ]);
    });
};
