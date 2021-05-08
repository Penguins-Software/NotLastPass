module.exports = mongoose => {
    const Password = new mongoose.model(
      "password",
      mongoose.Schema({
        website: {
          type: String,
          require: true
        },
        username: {
          type: String,
          require: true
        },
        password: {
          type: String,
          require: true
        }
      }
      )
    );
    
  
    return Password;
  };