
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('accounts').del()
    .then(function () {
      // Inserts seed entries
      return knex('accounts').insert([
        {email: 'john@doe.com', first_name: 'John', last_name: 'Doe'},
        {email: 'sally@sue.com', first_name: 'Sally', last_name: 'Sue'},
        {email: 'mark@johnson.com', first_name: 'Mark', last_name: 'Johnson'},
        {email: 'james@smith.com', first_name: 'James', last_name: 'Smith'},
        {email: 'robert@brown.com', first_name: 'Robert', last_name: 'Brown'}
      ]);
    });
};
