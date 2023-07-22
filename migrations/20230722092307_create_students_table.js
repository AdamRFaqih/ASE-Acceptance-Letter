exports.up = async function (knex) {
    const tableExists = await knex.schema.hasTable('students');
    if (tableExists) {
      await knex.schema.dropTable('students');
    }
    await knex.schema.createTable('students', function (table) {
      table.increments('id').primary();
      table.string('student_id', 10).unique().notNullable();
      table.string('password', 255).notNullable();
      table.boolean('accepted').defaultTo(false);
      table.string('unique_code', 20);
    });
  };
  
  exports.down = async function (knex) {

  };
  