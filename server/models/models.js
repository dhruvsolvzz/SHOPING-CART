/**
 * User represents a user in the system
 */
class User {
	constructor(id, username, password, token, cartId, createdAt) {
		this.id = id;
		this.username = username;
		this.password = password; // Should not be returned in JSON responses
		this.token = token;
		this.cart_id = cartId;
		this.created_at = createdAt;
	}
}

/**
 * Item represents a product that can be added to a cart
 */
class Item {
	constructor(id, name, status, createdAt) {
		this.id = id;
		this.name = name;
		this.status = status;
		this.created_at = createdAt;
	}
}

/**
 * Cart represents a user's shopping cart
 */
class Cart {
	constructor(id, userId, name, status, createdAt) {
		this.id = id;
		this.user_id = userId;
		this.name = name;
		this.status = status;
		this.created_at = createdAt;
	}
}

/**
 * CartItem represents an item in a cart with quantity
 */
class CartItem {
	constructor(cartId, itemId) {
		this.cart_id = cartId;
		this.item_id = itemId;
	}
}

/**
 * Order represents a completed order
 */
class Order {
	constructor(id, cartId, userId, createdAt) {
		this.id = id;
		this.cart_id = cartId;
		this.user_id = userId;
		this.created_at = createdAt;
	}
}

module.exports = { User, Item, Cart, CartItem, Order };