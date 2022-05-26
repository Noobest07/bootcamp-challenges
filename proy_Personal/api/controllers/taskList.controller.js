import { TaskList } from '../models/index.js';

export const getLists = async (req, res) => {
  try {
    const lists = await TaskList.find({ user: req.user._id });
    if (lists.length === 0) res.status(204).send();
    else res.status(200).json(lists);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const getList = async (req, res) => {
  const { id: listId } = req.params;
  const list = await TaskList.findOne({ _id: listId, user: req.user._id });
  res.json(list);
};

export const createList = async (req, res) => {
  try {
    req.body.user = req.user._id;
    const list = new TaskList(req.body);
    const newList = await list.save();
    newList && res.status(201).json(newList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const findList = async (req, res, next) => {
  const { id: listId } = req.params;
  try {
    const list = await TaskList.findOne({ _id: listId, user: req.user._id });
    if (list) {
      req.data = {
        list: list,
      };
      next();
    } else {
      res.status(204).json({ error: 'No list' });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const updateList = async (req, res) => {
  const listToUpdate = req.body;
  const { list } = req.data;
  const newData = {};
  const { name, items } = listToUpdate;
  if (name) {
    newData.name = name;
  }
  if (items) {
    newData.items = items;
  }
  try {
    TaskList.updateOne(list, newData, (error, updatedList) => {
      if (!error) {
        res.status(200).json(updatedList);
      } else res.status(500).send(error);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const uploadImage = async (req, res) => {
  const { list } = req.data;
  try {
    TaskList.updateOne(
      list,
      { image: req.file.buffer },
      (error, updatedList) => {
        if (!error) {
          res.status(200).json(updatedList);
        } else res.status(500).send(error);
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteImage = async (req, res) => {
  const { list } = req.data;
  try {
    TaskList.updateOne(list, { image: null }, (error, updatedList) => {
      if (!error) {
        res.status(200).json(updatedList);
      } else res.status(500).send(error);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getImage = async (req, res) => {
  try {
    const list = await TaskList.findById(req.params.id);
    if (!list || !list.image) {
      throw new Error();
    }
    res.set('Content-Type', 'image/jpg');
    res.send(list.image);
  } catch (e) {
    res.status(404).send();
  }
};

export const deleteList = async (req, res) => {
  const { id: listId } = req.params;

  try {
    const listToDelete = await TaskList.findOne({
      _id: listId,
      user: req.user._id,
    });
    if (!listToDelete) res.status(204).json({ error: 'No list to delete' });
    else {
      const deletedList = await TaskList.deleteOne(listToDelete);
      if (deletedList) res.status(200).json(deletedList);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
