import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TaskList } from '../../components/TaskList/TaskList';
import { PageContainer } from '../../components/PageContainer/PageContainer';
import { useAppDataContext } from '../../components/AppData';

const blockClass = `archive`;

export const Archive = ({ className }) => {
  const appData = useAppDataContext();

  const taskFilter = (task) => task.archive;
  const actions = [
    {
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
      label: 'Restore',
      onClick: (ids) => {
        ids.forEach((id) =>
          appData.updateTask({
            id,
            archive: false,
          }),
        );
      },
      selectMode: true,
    },
    {
      label: 'Delete',
      onClick: (ids) => {
        appData.deleteTasks(ids);
      },
      selectMode: true,
    },
  ];

  return (
    <PageContainer
      className={classNames(className, blockClass)}
      title='Archive'
      description='Tasks no longer active.'
    >
      <TaskList
        actions={actions}
        className={`${blockClass}__task-list`}
        taskFilter={taskFilter}
      />
    </PageContainer>
  );
};

Archive.propTypes = {
  className: PropTypes.string,
};

export default Archive;
