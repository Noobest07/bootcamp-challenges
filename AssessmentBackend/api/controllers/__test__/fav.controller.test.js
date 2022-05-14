import mongoose from 'mongoose';
import { getFavs, createFav, getFav, deleteFav } from '../fav.controller.js';
import Fav from '../../models/fav.model.js';

let item1 = {
  title: 'The Matrix Resurrections',
  description: 'Sequel of Matrix',
  link: 'https://www.themoviedb.org/movie/624860-the-matrix-resurrections',
};

let favorite1 = {
  name: 'Movies',
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

let con = describe('Product controller tests', () => {
  beforeAll(async () => {
    const dbConnection = 'mongodb+srv://noobest:123@cluster0.pkr8u.mongodb.net/test?retryWrites=true&w=majority';
    con = await mongoose.connect(dbConnection);
  });
  afterAll(async () => {
    mongoose.disconnect();
  });

  it('should add fav', async () => {
    const req = mockRequest(favorite1);
    const res = mockResponse();

    await createFav(req, res);

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(res.data);
  });

  it('should get all fav', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await getFavs(req, res);

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(res.data);
  });

  it('should get one fav', async () => {
    const fav = await Fav.findOne();
    const spy = jest.spyOn(Fav, 'findById');
    const req = mockRequest({}, { id: fav._id });
    const res = mockResponse();
    await getFav(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(res.data);
  });

  it('should delete one fav', async () => {
    const fav = await Fav.findOne();
    const spy = jest.spyOn(Fav, 'deleteOne');
    const req = mockRequest({}, { id: fav._id });
    const res = mockResponse();
    await deleteFav(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(res.data);
  });
});
