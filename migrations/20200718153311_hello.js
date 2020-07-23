
exports.up = function(knex) {
    return knex.schema.createTable("shopping_Movetocart", function(t) {
        t.increments("item_id").primary();
        t.specificType("cart_id","varchar");
        t.specificType("product_id","int");   
        t.specificType("quantity","int");
        t.specificType("attributes","varchar");
        // t.timestamp("buy_now", { useTz: true });
        // t.timestamp("added_on", { useTz: true });
      });
    
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("shopping_Movetocart");
};
