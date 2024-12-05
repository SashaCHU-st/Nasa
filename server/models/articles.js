const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new mongoose.Schema({
  nasa_id: { type: String, required: true, unique: true },
  articleId: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },/// generated for each article
  title: { type: String, default: "Untitled Article" },
  description: { type: String, default: "No description available." },
  image: { type: String, default: "default-image-url.jpg" },
  userId: { type: mongoose.Types.ObjectId, ref: 'User' },/// specific type of objatc in MongoDb
});


module.exports = mongoose.model('Article', articleSchema);