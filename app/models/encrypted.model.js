module.exports = mongoose => {
    return new mongoose.model(
      "encrypted",
      mongoose.Schema({
        data: {
          type: String,
          require: true
        }
      }, { _id: true })
    );
  };