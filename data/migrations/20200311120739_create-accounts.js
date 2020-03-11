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
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("accounts");
};
