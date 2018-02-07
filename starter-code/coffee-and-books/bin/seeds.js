const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Books&Coffee");
const CoffeeShop = require("../models/place");
const BookStore = require("../models/place");

const bookStores = [
  {
    title: "The Book Lover",
    description: "A very big store containig a large choice of books",
    location: ""
  }
];
const coffeeShops = [
  {
    title: "The Book Club",
    description: "Beautiful",
    location: ""
  }
];

CoffeeShop.create(coffeeShops, (err, savedCoffeeShops) => {
  if (err) {
    throw err;
  }
  savedCoffeeShops.forEach(theCoffeeShop => {
    console.log(`${theCoffeeShop.title} - ${theCoffeeShop._id}`);
  });
});
BookStore.create(bookStores, (err, savedBookStores) => {
  if (err) {
    throw err;
  }
  savedBookStores.forEach(theBookStore => {
    console.log(`${theBookStore.title} - ${theBookStore._id}`);
  });
  mongoose.disconnect();
});
