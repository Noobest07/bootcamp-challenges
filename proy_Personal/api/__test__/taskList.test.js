import axios from 'axios';
const baseRoute = 'http://localhost:5000/api';
const listsRoute = 'http://localhost:5000/api/lists';

describe('Task lists tests', () => {
  let headers = {
    token: '',
  };

  let listId = '';

  let item1 = {
    title: 'Comprar escritorios nuevos',
    description: 'Máximo 3000 soles de presupuesto',
  };

  let item2 = {
    title: 'Pagar internet',
    description: 'Empresa Entel',
    isDone: true,
  };

  let taskList1 = {
    name: 'Tareas oficina',
    items: [item1],
  };

  let taskList2 = {
    name: 'Tareas oficina Updated',
    items: [item1, item2],
  };

  beforeAll(async () => {
    const name = 'David';
    const email = 'david@gmail.com';
    const password = '1234567890';
    // Descomentar esta parte del código la primera vez que se vayan a correr las pruebas
    // await axios.post(baseRoute + '/auth/users/create', {
    //   name,
    //   email,
    //   password,
    // });
    const login = await axios.post(baseRoute + '/auth/users/login', {
      email,
      password,
    });
    headers.token = login.data.token;
  });

  it('should create a taskList', async () => {
    const result = await axios.post(listsRoute, taskList1, { headers });
    const data = result.data;
    expect(data).toBeDefined();
    expect(data.name).toEqual(taskList1.name);
    const item = data.items[0];
    expect(item.title).toEqual(item1.title);
    expect(item.description).toEqual(item1.description);
  });

  it('should get lists', async () => {
    const result = await axios.get(listsRoute, {
      headers,
    });
    expect(result.status).toEqual(200);
    listId = result.data[0]._id;
  });

  it('should get created taskList', async () => {
    const result = await axios.get(listsRoute + '/' + listId, {
      headers,
    });
    expect(result.status).toEqual(200);
  });

  it('should update taskList', async () => {
    const result = await axios.put(listsRoute + '/' + listId, taskList2, {
      headers,
    });
    expect(result.status).toEqual(200);
    expect(result.data.modifiedCount).toEqual(1);
  });

  it('should delete taskList', async () => {
    const result = await axios.delete(listsRoute + '/' + listId, {
      headers,
    });
    expect(result.status).toEqual(200);
    expect(result.data.deletedCount).toEqual(1);
  });
});
