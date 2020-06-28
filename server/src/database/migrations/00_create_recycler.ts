import Knex from "knex";

// method to create table
export async function up(knex: Knex) {
    return knex.schema.createTable('recycler', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.decimal('city').notNullable();
        table.decimal('uf', 2).notNullable();
    })
}

//method to remove item from table
export async function down(knex: Knex) {
    return knex.schema.dropTable('recycler')
}