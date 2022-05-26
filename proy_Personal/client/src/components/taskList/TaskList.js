import {
  Container,
  Checkbox,
  Divider,
  TextField,
  Box,
  Card,
  Button,
  FormControlLabel,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getList,
  updateList,
  createList,
  uploadImage,
  deleteImage,
} from '../../actions/taskList';

const TaskList = ({
  getList,
  updateList,
  createList,
  uploadImage,
  deleteImage,
}) => {
  const [form, setForm] = useState({
    name: '',
    items: [],
  });
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const toBase64 = (array) => {
    return btoa(
      array.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
  };

  const { id } = useParams();

  const getImage = async () => {
    const data = await getList(id);
    if (data.image) {
      const image = `data:image/jpg;base64,${toBase64(data.image.data)}`;
      setImage(image);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    const setValue = async () => {
      if (id === 'new') {
        return;
      }
      const data = await getList(id);
      if (data.image) {
        const image = `data:image/jpg;base64,${toBase64(data.image.data)}`;
        setImage(image);
      } else {
        setImage(null);
      }
      setForm(data);
    };
    setValue();
  }, [getList, id]);

  const changeName = (e) => {
    const name = e.target.value;
    setForm({ ...form, name });
  };

  const addItem = () => {
    form.items.push({
      title: '',
      description: '',
      isDone: false,
    });
    setForm({ ...form });
  };

  const changeItem = (e, idx) => {
    const item = form.items[idx];
    const field = e.target.name;
    let value;
    if (field === 'isDone') {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    item[field] = value;
    setForm({ ...form });
  };

  const deleteItem = (idx) => {
    form.items.splice(idx, 1);
    setForm({ ...form });
  };

  const selectedImage = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    await uploadImage(id, formData);
    await getImage();
  };

  const callDeleteImage = async (e) => {
    await deleteImage(id);
    await getImage();
  };

  const submit = async (e) => {
    e.preventDefault();
    let ok;
    if (id !== 'new') {
      ok = await updateList(id, form);
    } else {
      ok = await createList(form);
    }
    if (ok) {
      navigate('/');
    }
  };
  return (
    <Container maxWidth='md' sx={{ marginBottom: '30px', marginTop: '50px' }}>
      <Box
        sx={{
          width: '100%',
          '& .MuiTextField-root': { width: '300px' },
        }}>
        <Box>
          <Button
            sx={{ backgroundColor: 'grey' }}
            variant='contained'
            onClick={() => {
              navigate('/');
            }}>
            Atrás
          </Button>
        </Box>
        <form
          onSubmit={(e) => {
            submit(e);
          }}>
          <Box>
            <TextField
              id='taskGroupName'
              label='Nombre del grupo de tareas'
              variant='standard'
              margin='normal'
              type='text'
              name='name'
              required
              value={form.name}
              onChange={(e) => {
                changeName(e);
              }}
            />
          </Box>
          <Divider />
          <Button
            sx={{ marginTop: '10px', marginBottom: '30px' }}
            color='success'
            variant='contained'
            onClick={() => {
              addItem();
            }}>
            Nueva tarea
          </Button>
          {form &&
            form.items.map((i, idx) => (
              <Card sx={{ padding: '10px', marginBottom: '40px' }} key={idx}>
                <Box>
                  <TextField
                    label='Nombre de la tarea'
                    variant='standard'
                    margin='normal'
                    type='text'
                    name='title'
                    required
                    value={form.items[idx].title}
                    onChange={(e) => {
                      changeItem(e, idx);
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    label='Descripción de la tarea'
                    variant='standard'
                    margin='normal'
                    type='text'
                    name='description'
                    value={form.items[idx].description}
                    onChange={(e) => {
                      changeItem(e, idx);
                    }}
                  />
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      name='isDone'
                      checked={form.items[idx].isDone}
                      onChange={(e) => {
                        changeItem(e, idx);
                      }}
                    />
                  }
                  label='¿Terminada?'
                />
                <Box>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => {
                      deleteItem(idx);
                    }}>
                    Eliminar
                  </Button>
                </Box>
              </Card>
            ))}
          {!form || form.items.length === 0 ? (
            <Typography sx={{ marginBottom: '20px' }}>
              No tiene tareas añadidas. Añada una
            </Typography>
          ) : null}
          {image && (
            <div>
              <Box
                component='img'
                sx={{
                  height: 233,
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                src={image}
              />
              <Box>
                <Button
                  sx={{ marginY: '20px' }}
                  variant='contained'
                  component='label'>
                  Cambiar imagen
                  <input
                    onChange={(e) => {
                      selectedImage(e);
                    }}
                    accept='image/*'
                    type='file'
                    hidden
                  />
                </Button>
                <Button
                  sx={{ marginLeft: '20px' }}
                  variant='contained'
                  component='label'
                  color='error'
                  onClick={() => {
                    callDeleteImage();
                  }}>
                  Eliminar imagen
                </Button>
              </Box>
            </div>
          )}
          {!image && id !== 'new' && (
            <Box>
              <Button
                sx={{ marginY: '20px' }}
                variant='contained'
                component='label'>
                Subir imagen
                <input
                  onChange={(e) => {
                    selectedImage(e);
                  }}
                  accept='image/*'
                  type='file'
                  hidden
                />
              </Button>
            </Box>
          )}
          <Box>
            <Button type='submit' variant='contained'>
              Guardar
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

TaskList.propTypes = {
  getList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  taskLists: state.taskList.taskLists,
});

export default connect(mapStateToProps, {
  getList,
  updateList,
  createList,
  uploadImage,
  deleteImage,
})(TaskList);
