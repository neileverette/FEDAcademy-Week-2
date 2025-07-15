// import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TaskList } from '../../components/TaskList/TaskList';
import { PageContainer } from '../../components/PageContainer/PageContainer';
import { useAppDataContext } from '../../components/AppData';
import { NewTask } from '../../components/NewTask';
import { useRef, useState } from 'react';

const blockClass = `page-tasks`;

export const Tasks = ({ className }) => {
  const appData = useAppDataContext();
  const refNewTaskDialog = useRef();
  const [openNew, setOpenNew] = useState(false);

  const handleNewTask = () => {
    setOpenNew(true);
  };

  const handleNewTaskForm = (newTask) => {
    const task = { ...newTask };
    task.done = false;
    setOpenNew(false);
    appData.newTask(task);
  };

  const handleNewTaskClose = () => {
    setOpenNew(false);
  };

  const taskFilter = (task) => !task.archive;
  const actions = [
    {
      kind: 'primary',
      label: 'New task',
      onClick: handleNewTask,
    },
    {
      kind: 'primary',
      label: 'Use in portfolio',
      onClick: (ids) => {
        ids.forEach((id) =>
          appData.updateTask({
            id,
            portfolio: true,
          }),
        );
      },
      selectMode: true,
    },
    {
      kind: 'secondary',
      label: 'Archive',
      onClick: (ids) => {
        ids.forEach((id) =>
          appData.updateTask({
            id,
            archive: true,
          }),
        );
      },
      selectMode: true,
    },
    {
      kind: 'danger',
      label: 'Delete',
      onClick: (ids) => {
        appData.deleteTasks(ids);
      },
      selectMode: true,
    },
  ];

  return (
    <PageContainer
      className={classNames(blockClass, className)}
      title='Tasks'
      description='Live tasks that you are still engaged with.'
    >
      <TaskList
        actions={actions}
        className={`${blockClass}__task-list`}
        taskFilter={taskFilter}
        options={{ canComplete: true }}
      />
      <NewTask
        ref={refNewTaskDialog}
        onSubmit={handleNewTaskForm}
        open={openNew}
        onClose={handleNewTaskClose}
      />
    </PageContainer>
  );
};

Tasks.propTypes = {
  className: PropTypes.string,
};

export default Tasks;
