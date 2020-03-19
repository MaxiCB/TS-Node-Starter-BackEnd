exports.up = function(knex) {
  return knex.schema.createTable("accounts", tbl => {
    tbl.increments();
    tbl
      .text("email", 128)
      .unique()
      .notNullable();
    tbl
      .text("first_name", 128)
      .notNullable();
    tbl
      .text("last_name", 128)
      .notNullable();
    tbl
      .text("password")
      .notNullable();
    tbl
      .text("profileImage")
      .notNullable()
      .defaultTo('DEFAULT')
    tbl
      .foreign('id')
      .references('author_id')
      .inTable('posts')
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("accounts");
};
