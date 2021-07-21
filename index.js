const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // CREATE RECIPE
    Recipe.create({
      title: "Chicken Adobo",
      level: "Amateur Chef",
      ingredients: ['2 lbspork belly', '2 tbs garlic', '5 dried bay leaves', '4 tbs vinegar', '1/2 cup soy sauce', '1 tbs peppercorn', '2 cups water', 'salt'],
      cuisine: 'Pinoy',
      dishType: "main_course",
      duration: 70,
      creator: 'Joh',
    })
    .then((createdDocument) => {
      console.log(createdDocument.title);
    })
    .catch((error) => {
      console.log(error)
    })

    Recipe.insertMany(data)
    .then((createdDocument) => {
      createdDocument.forEach(item => console.log(item.title))

      Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
        .then((updatedDocument) => {
          // console.log(updatedDocument.title + ' duration has been updated to ' + updatedDocument.duration);
          console.log("updated document !!! " + updatedDocument)
        })
        .catch((error) => {
          console.log(error)
        })
      
        Recipe.findOneAndDelete({title: "Carrot Cake"})
        .then(() => {
          console.log("Document deleted!")
        })
        .catch((error) => {
          console.log(error)
        })
    })
    .catch((error) => {
      console.log(error)
    })
    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.close(() =>  {
    console.log("connection closed")
  })