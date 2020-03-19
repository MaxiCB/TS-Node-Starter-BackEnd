
exports.up = function(knex) {
    return knex.schema.createTable("posts", tbl => {
        tbl.increments();
        tbl
          .text("post_title", 128)
          .notNullable();
        tbl
          .integer('author_id')
          .notNullable();
        tbl
          .text("post_content")
          .notNullable();
        tbl
          .text("post_image")
          .defaultTo('DEFAULT')
          .notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("posts");
};
