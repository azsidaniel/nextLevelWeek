import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('recycler_item', table => {
        table.integer('id').primary();
        table.integer('recycler_id').notNullable().references('id').inTable('recycler');
        table.integer('item_id').notNullable().references('id').inTable('item');
    })
}
export async function down(knex: Knex) {
    return knex.schema.dropTable('recyler_item')
}