import app from './app.js';
import mongoose from 'mongoose';

const { DB_HOST, PORT = 3000 } = process.env;
console.log('PORT =>', PORT);
console.log('DB_HOST =>', DB_HOST);
console.log('process.env in server =>', process.env);
mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
