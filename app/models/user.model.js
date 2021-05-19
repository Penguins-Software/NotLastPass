module.exports = mongoose => {
    return new mongoose.model(
        "users", 
        mongoose.Schema({
        username: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
      }
    })
    );
  
  };