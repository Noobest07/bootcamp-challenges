import {
  Container,
  Typography,
  Box,
  Card,
  Button,
  Divider,
} from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getLists, deleteList } from '../../actions/taskList';

const TaskLists = ({ getLists, deleteList, taskLists }) => {
  useEffect(() => {
    getLists();
  }, [getLists]);

  const navigate = useNavigate();

  const navigateTo = (url) => {
    navigate(url);
  };

  return (
    <Container maxWidth='md' sx={{ marginBottom: '30px', marginTop: '50px' }}>
      <Box
        sx={{
          width: '100%',
        }}>
        <Typography>Lista de tareas</Typography>
        <Button
          sx={{ marginTop: '10px', marginBottom: '15px' }}
          color='success'
          variant='contained'
          onClick={() => {
            navigateTo('new');
          }}>
          Nueva lista
        </Button>
        <Divider sx={{ marginBottom: '15px' }} />
        {taskLists &&
          taskLists.map((i, idx) => (
            <Card sx={{ padding: '10px', marginBottom: '40px' }} key={idx}>
              <Typography>
                {idx + 1 + ')'} {i.name} (
                {i.items.filter((e) => e.isDone).length}/{i.items.length})
              </Typography>
              <Button
                sx={{ marginTop: '10px' }}
                variant='contained'
                onClick={() => {
                  navigateTo(i._id);
                }}>
                Editar
              </Button>
              <Button
                sx={{ marginLeft: '10px', marginTop: '10px' }}
                color='error'
                variant='contained'
                onClick={() => {
                  deleteList(i._id);
                }}>
                Eliminar
              </Button>
            </Card>
          ))}
        {!taskLists || taskLists.length === 0 ? (
          <Typography>No tiene listas actualmente. Añada una</Typography>
        ) : null}
      </Box>
    </Container>
  );
};

TaskLists.propTypes = {
  getLists: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  taskLists: state.taskList.taskLists,
});

export default connect(mapStateToProps, { getLists, deleteList })(TaskLists);
