import mongoose from 'mongoose';

const schemaFav = {
  name: String,
  items: [
    {
      title: String,
      description: String,
      link: String,
    },
  ],
  created_at: {
    type: Date,
    default: Date.now(),
  },
};

const Fav = mongoose.model('Fav', schemaFav, 'favs');

export default Fav;
