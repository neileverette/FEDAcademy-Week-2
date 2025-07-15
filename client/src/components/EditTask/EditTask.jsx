import PropTypes from 'prop-types';
import classNames from 'classnames';

import { forwardRef } from 'react';
import { CreateEditTask } from '../CreateEditTask/CreateEditTask';

const blockClass = `edit-task`;

const taskFields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'due', label: 'Due date', type: 'date' },
  { name: 'notes', label: 'Notes', type: 'textarea' },
  { name: 'result', label: 'Results', type: 'textarea' },
  { name: 'image', label: 'Image', type: 'image' },
];

export const EditTask = forwardRef(({ className, ...props }, ref) => (
  <CreateEditTask
    {...props}
    className={classNames(className, blockClass)}
    ref={ref}
    taskFields={taskFields}
    heading='Edit task'
  />
));

EditTask.displayName = 'EditTask';

EditTask.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    due: PropTypes.shape({
      type: PropTypes.string,
      value: PropTypes.string,
    }),
    notes: PropTypes.string,
    results: PropTypes.string,
    image: PropTypes.shape({
      type: PropTypes.string,
      value: PropTypes.string,
    }),
  }),
};

export default EditTask;
