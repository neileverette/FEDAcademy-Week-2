import PropTypes from 'prop-types';
import classNames from 'classnames';

import { forwardRef } from 'react';
import { CreateEditTask } from '../CreateEditTask/CreateEditTask';

const blockClass = `new-task`;

const taskFields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'due', label: 'Due date', type: 'date' },
  { name: 'notes', label: 'Notes', type: 'textarea' },
];

export const NewTask = forwardRef(({ className, ...props }, ref) => (
  <CreateEditTask
    {...props}
    className={classNames(className, blockClass)}
    ref={ref}
    taskFields={taskFields}
    heading='New task'
  />
));

NewTask.displayName = 'NewTask';

NewTask.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default NewTask;
