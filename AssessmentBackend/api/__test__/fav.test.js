import axios from 'axios';
const baseRoute = 'http://localhost:5000/api';
const favRoute = 'http://localhost:5000/api/favs';

describe('Favorites tests', () => {
  let headers = {
    token: '',
  };

  let favId = '';

  let item1 = {
    title: 'The Matrix Resurrections',
    description: 'Sequel of Matrix',
    link: 'https://www.themoviedb.org/movie/624860-the-matrix-resurrections',
  };

  let item2 = {
    title: 'Spider-Man: No Way Home',
    description: 'Last movie of SpiderMan',
    link: 'https://www.themoviedb.org/movie/634649-spider-man-no-way-home',
  };

  let favorite1 = {
    name: 'Movies',
    items: [item1],
  };

  let favorite2 = {
    name: 'Movies Updated',
    items: [item1, item2],
  };

  beforeAll(async () => {
    const email = 'david1@gmail.com';
    const password = '1234567890';
    // Descomentar la primera vez que se va a correr para rear el usuario en la BD
    // Luego dejar comentado
    //  await axios.post(baseRoute + '/users/create', {
    //    email,
    //    password,
    //  });
    const login = await axios.post(baseRoute + '/auth/local/login', {
      email,
      password,
    });
    headers.token = login.data.token;
  });

  it('should create a fav', async () => {
    const result = await axios.post(favRoute, favorite1, { headers });
    const data = result.data;
    expect(data).toBeDefined();
    expect(data.name).toEqual(favorite1.name);
    const item = data.items[0];
    expect(item.title).toEqual(item1.title);
    expect(item.description).toEqual(item1.description);
    expect(item.link).toEqual(item1.link);
  });

  it('should get favs list', async () => {
    const result = await axios.get(favRoute, {
      headers,
    });
    expect(result.status).toEqual(200);
    favId = result.data[0]._id;
  });

  it('should get created fav', async () => {
    const result = await axios.get(favRoute + '/' + favId, {
      headers,
    });
    expect(result.status).toEqual(200);
  });

  it('should update fav', async () => {
    const result = await axios.put(favRoute + '/' + favId, favorite2, {
      headers,
    });
    expect(result.status).toEqual(200);
    expect(result.data.modifiedCount).toEqual(1);
  });

  it('should delete a fav', async () => {
    const result = await axios.delete(favRoute + '/' + favId, {
      headers,
    });
    expect(result.status).toEqual(200);
    expect(result.data.deletedCount).toEqual(1);
  });
});
