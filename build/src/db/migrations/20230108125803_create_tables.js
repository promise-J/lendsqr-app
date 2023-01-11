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
            // t.uuid('user_id').notNullable().primary()
            t.string('email').notNullable().unique().checkRegex("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/");
            t.string('password').notNullable().checkLength('>=', 6);
            t.string('c_password').notNullable().checkLength('>=', 6);
            t.timestamps(true, true);
        });
        yield knex.schema.createTable('wallet', function (t) {
            t.integer('balance').defaultTo(0);
            t.uuid('wallet_id').primary();
            t.uuid('user_id').references('user_id').inTable('user');
            t.timestamps(true, true);
        });
        yield knex.schema.createTable('user', function (t) {
            t.foreign('wallet_id').references('wallet_id').inTable('wallet');
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTable('user');
        yield knex.schema.dropTable('wallet');
    });
}
exports.down = down;
