module.exports = mongoose => {
    return new mongoose.model(
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
      }, { _id: true })
    );
  };