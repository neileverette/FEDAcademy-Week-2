import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tile } from '@carbon/react';

import './task-card.scss';

const blockClass = `task-card`;

export const TaskCard = ({
  className,
  id,
  onClick,
  footer,
  description,
  title,
  portfolio,
}) => {
  const handleOnClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <Tile className={classNames(className, blockClass)}>
      <a
        href='#'
        onClick={handleOnClick}
        aria-label='View task'
        className={`${blockClass}__top ${blockClass}__link`}
      >
        <h5 className={`${blockClass}__title`}>{title}</h5>
        {portfolio && (
          <div
            className={`${blockClass}__portfolio`}
            aria-label='Is in portfolio'
            title='Is in portfolio'
          >
            ★
          </div>
        )}
        <p className={`${blockClass}__description`}>{description}</p>
      </a>

      {footer ? <div className={`${blockClass}__footer`}>{footer}</div> : null}
    </Tile>
  );
};

TaskCard.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  footer: PropTypes.node,
  portfolio: PropTypes.bool,
};

export default TaskCard;
