
'use strict';
const DealServices = {
    getAllDeals(knex) {
        return knex.select('*').from('deals_table')
    },

    insertDeal(knex, newDeal) {
        return knex
            .insert(newDeal)
            .into('deals_table')
            .returning('*')
            .then(rows => {
                return rows[rows.length - 1]
            })
    },

    getById(knex, id) {
        return knex
            .from('deals_table')
            .select('*')
            .where('id', id)
            .first()
    },

    deleteById(knex, id) {
        return knex('deals_table')
            .where({ id })
            .delete()
    },

    updateById(knex, id, newDealFields) {
        return knex('deals_table')
            .where({ id })
            .update(newDealFields)
    }
}

module.exports = DealServices;