import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TaskList } from '../../components/TaskList/TaskList';
import { PageContainer } from '../../components/PageContainer/PageContainer';
import { useAppDataContext } from '../../components/AppData';

const blockClass = `portfolio`;

export const Portfolio = ({ className }) => {
  const appData = useAppDataContext();

  const taskFilter = (task) => task.portfolio;
  const actions = [
    {
      label: 'Remove from portfolio',
      onClick: (ids) => {
        ids.forEach((id) =>
          appData.updateTask({
            id,
            portfolio: false,
          }),
        );
      },
      selectMode: true,
    },
  ];

  return (
    <PageContainer
      className={classNames(className, blockClass)}
      title='Portfolio'
      description='Achievements you want to highlight.'
    >
      <TaskList
        actions={actions}
        className={`${blockClass}__task-list`}
        taskFilter={taskFilter}
      />
    </PageContainer>
  );
};

Portfolio.propTypes = {
  className: PropTypes.string,
};

export default Portfolio;
