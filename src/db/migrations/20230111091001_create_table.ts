import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user', function(t){
        t.uuid('user_id').primary()
        t.string('email').unique()
        t.string('password').notNullable()
        t.timestamps(true, true)
      })
      await knex.schema.createTable('wallet', function(t){
        t.integer('balance').defaultTo(0)
        t.uuid('wallet_id').primary()
        t.uuid('user_id').references('user_id').inTable('user').onUpdate('CASCADE').onDelete('CASCADE')
        t.timestamps(true, true)
      })
      await knex.schema.table('user', function(t){
        t.foreign('wallet_id').references('wallet_id').inTable('wallet')
      })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('user').dropTable('wallet')
}

