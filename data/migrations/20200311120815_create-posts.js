
exports.up = function(knex) {
    return knex.schema.createTable("posts", tbl => {
        tbl.increments();
        tbl
          .text("post_title", 128)
          .notNullable();
        tbl
          .text("post_author", 128)
          .notNullable();
        tbl
          .text("post_content")
          .notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("posts");
};
