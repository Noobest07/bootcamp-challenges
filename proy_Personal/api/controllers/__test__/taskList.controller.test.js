import mongoose from 'mongoose';
import {
  getLists,
  createList,
  getList,
  deleteList,
} from '../taskList.controller';
import TaskList from '../../models/taskList.model.js';
import User from '../../models/user.model.js';

let item1 = {
  title: 'Comprar escritorios nuevos',
  description: 'Máximo 3000 soles de presupuesto',
};

let taskList1 = {
  name: 'Tareas oficina',
  items: [item1],
};

const mockRequest = (body, params) => {
  const req = {};
  req.body = { ...body };
  req.params = { ...params };
  return req;
};

const mockResponse = () => {
  const res = {};

  function response(data) {
    res.data = data;
  }

  res.send = jest.fn();
  res.json = jest.fn().mockImplementation(response);
  res.next = jest.fn();
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

let con = describe('TaskList controller tests', () => {
  beforeAll(async () => {
    const dbConnection =
      'mongodb+srv://dev:dKZhnc0cAyJq6J4E@task-list-manager.uolhw.mongodb.net/test?retryWrites=true&w=majority';
    con = await mongoose.connect(dbConnection);
  });
  afterAll(async () => {
    mongoose.disconnect();
  });

  it('should add list', async () => {
    const req = mockRequest(taskList1);
    req.user = await User.findOne();
    const res = mockResponse();

    await createList(req, res);

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(res.data);
  });

  it('should get all lists', async () => {
    const req = mockRequest();
    req.user = await User.findOne();
    const res = mockResponse();

    await getLists(req, res);

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(res.data);
  });

  it('should get one list', async () => {
    const list = await TaskList.findOne();
    const req = mockRequest({}, { id: list._id });
    req.user = await User.findOne();
    const spy = jest.spyOn(TaskList, 'findOne');
    const res = mockResponse();
    await getList(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(res.data);
  });

  it('should delete one list', async () => {
    const list = await TaskList.findOne();
    const spy = jest.spyOn(TaskList, 'deleteOne');
    const req = mockRequest({}, { id: list._id });
    req.user = await User.findById(list.user);
    const res = mockResponse();
    await deleteList(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(res.data);
  });
});
