const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');


const recipeSchema = new Schema ({
  title: {type : String, required : true, unique: true} ,
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients : Array,
  cuisine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now}
})
  
const Recipe = mongoose.model('Recipe', recipeSchema);

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    return Recipe.remove();
  })
  .then(() => {
    console.log('empty db');
    return Recipe.create({
      title: 'tartiflette',
      level: 'Easy Peasy',
      ingredients: ['Potatoes', 'Cheese', 'Bacon', 'Love', 'Onion'],
      cuisine: 'French',
      dishType: 'Dish',
      image: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjJovvVqJrgAhWB1eAKHRM-DyEQjRx6BAgBEAU&url=https%3A%2F%2Fwww.cuisineaz.com%2Frecettes%2Ftartiflette-de-virginie-12701.aspx&psig=AOvVaw3jmL-2TrkOS8a3mhcCxJa-&ust=1549103036991899',
      duration: 60,
      creator: 'Nico',
    })
  })
  .then((result) => {
    console.log('Recipe created for ', result);
    return Recipe.insertMany(data);
  })
  .then((result) => {
    result.forEach(recipe => {
      console.log(recipe.title);
    })
    return Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100});
  })
  .then((result) => {
    console.log('Successfuly update', result);
    return Recipe.remove({title: 'Carrot Cake'});
  })
  .then(result => {
    console.log('We removed ', result);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });
  




  
