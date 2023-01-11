"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.createTable('user', function (t) {
            t.uuid('user_id').primary();
            t.string('email').unique();
            t.string('password').notNullable();
            t.timestamps(true, true);
        });
        yield knex.schema.createTable('wallet', function (t) {
            t.integer('balance').defaultTo(0);
            t.uuid('wallet_id').primary();
            t.uuid('user_id').references('user_id').inTable('user').onUpdate('CASCADE').onDelete('CASCADE');
            t.timestamps(true, true);
        });
        yield knex.schema.table('user', function (t) {
            t.foreign('wallet_id').references('wallet_id').inTable('wallet');
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield knex.schema.dropTable('user').dropTable('wallet');
    });
}
exports.down = down;
