import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useAppDataContext } from '../AppData';

import './showcase.scss';
import { apiPath } from '../../utils/api-calls';

const blockClass = `showcase`;

export const Showcase = ({ className }) => {
  const appData = useAppDataContext();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(
      appData.state?.tasks
        ?.filter((task) => task.portfolio)
        .sort((a, b) => b.created.value.localeCompare(a.created.value)),
    );
  }, [appData.state.tasks]);

  return (
    <section className={classNames(className, blockClass)}>
      {tasks.map(({ id, title, description, doneDate, image, results }) => {
        return (
          <div className={`${blockClass}__section-content`} key={id}>
            <h3 className={`${blockClass}__title`}>{title}</h3>
            <div className={`${blockClass}__info`}>
              <h4 className={`${blockClass}__description-label`}>
                Description
              </h4>
              <p className={`${blockClass}__description`}>{description}</p>
            </div>
            <div className={`${blockClass}__info`}>
              <h4 className={`${blockClass}__completed-label`}>Completed</h4>
              <p className={`${blockClass}__completed`}>
                {doneDate
                  ? new Date(doneDate.value).toLocaleDateString()
                  : 'Incomplete'}
              </p>
            </div>
            <div className={`${blockClass}__info`}>
              <h4 className={`${blockClass}__results-title`}>Results</h4>
              <p className={`${blockClass}__results`}>{results}</p>
            </div>
            {image ? (
              <div className={`${blockClass}__info`}>
                <img
                  className={`${blockClass}__image`}
                  src={`${apiPath}/${image.value}`}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </section>
  );
};

Showcase.propTypes = {
  className: PropTypes.string,
};

export default Showcase;
