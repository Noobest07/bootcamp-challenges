import mongoose from 'mongoose';

const taskListSchema = {
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      title: String,
      description: String,
      isDone: {
        type: Boolean,
        default: false,
      },
    },
  ],
  image: {
    type: Buffer,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
};

const TaskList = mongoose.model('TaskList', taskListSchema, 'taskLists');

export default TaskList;
