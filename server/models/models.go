package models

import (
	"time"

	"github.com/jinzhu/gorm"
)

// User represents a user in the system
type User struct {
	ID        uint      `gorm:"primary_key" json:"id"`
	Username  string    `gorm:"not null" json:"username"`
	Password  string    `gorm:"not null" json:"-"` // Password is not returned in JSON
	Token     string    `json:"token,omitempty"`
	CartID    uint      `json:"cart_id"`
	CreatedAt time.Time `json:"created_at"`
}

// Item represents a product that can be added to a cart
type Item struct {
	ID        uint      `gorm:"primary_key" json:"id"`
	Name      string    `gorm:"not null" json:"name"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
}

// Cart represents a user's shopping cart
type Cart struct {
	ID        uint      `gorm:"primary_key" json:"id"`
	UserID    uint      `json:"user_id"`
	Name      string    `json:"name"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
}

// CartItem represents an item in a cart with quantity
type CartItem struct {
	CartID uint `gorm:"primary_key;auto_increment:false" json:"cart_id"`
	ItemID uint `gorm:"primary_key;auto_increment:false" json:"item_id"`
}

// Order represents a completed order
type Order struct {
	ID        uint      `gorm:"primary_key" json:"id"`
	CartID    uint      `json:"cart_id"`
	UserID    uint      `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
}