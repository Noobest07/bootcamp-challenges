import { Fav } from '../models/index.js';

export const getFavs = async (req, res) => {
  try {
    const favs = await Fav.find({});
    if (favs.length === 0) res.status(204).send();
    else res.status(200).json(favs);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const getFav = async (req, res) => {
  const { id: favId } = req.params;
  const fav = await Fav.findById(favId);
  res.json(fav);
};

export const createFav = async (req, res) => {
  try {
    const fav = new Fav(req.body);
    const newFav = await fav.save();
    newFav && res.status(201).json(newFav);
  } catch (e) {
    response.status(500).json({ error: e });
  }
};

export const updateFav = async (req, res) => {
  const favToUpdate = req.body;
  const { fav } = req.data;

  try {
    Fav.updateOne(fav, favToUpdate, (error, updatedFav) => {
      if (!error) {
        res.status(200).json(updatedFav);
      } else res.status(500).send(error);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteFav = async (req, res) => {
  const { id: favId } = req.params;

  try {
    const favToDelete = await Fav.findById(favId);
    if (!favToDelete)
      res.status(204).json({ error: 'No favorite list to delete' });
    else {
      const deletedFav = await Fav.deleteOne(favToDelete);
      if (deletedFav) res.status(200).json(deletedFav);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const findFav = async (req, res, next) => {
  const { id: favId } = req.params;
  try {
    const fav = await Fav.findById(favId);
    if (fav) {
      req.data = {
        fav,
      };
      next();
    } else {
      res.status(204).json({ error: 'No fav' });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const verifyFavSameName = async (req, res, next) => {
  try {
    const favId = req.params.id;
    const { name } = req.body;
    const favs = await Fav.find({ name });
    if (favs.length) {
      if (favId && favs[0]._id.toString() === favId) {
        return next();
      }
      return res
        .status(400)
        .json({ error: 'Already favorite list with that name' });
    }
    next();
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
