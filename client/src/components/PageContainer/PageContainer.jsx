import PropTypes from 'prop-types';
import classNames from 'classnames';

import './page-container.scss';
import { AppHeader } from '../AppHeader';
import { Theme } from '@carbon/react';
import { useCarbonTheme } from '../../utils/use-carbon-theme';

const blockClass = `page-container`;

export const PageContainer = ({ children, className, description, title }) => {
  const theme = useCarbonTheme();

  return (
    <Theme theme={theme} className={classNames(className, blockClass)}>
      <div className={`${blockClass}__inner`}>
        <AppHeader
          className={`${blockClass}__header`}
          title={title}
        ></AppHeader>
        <div className={`${blockClass}__page-header`}>
          <h2 className={`${blockClass}__title display-4`}>{title}</h2>
          <p className={`${blockClass}__description`}>{description}</p>
        </div>
        <main className={`${blockClass}__content`}>{children}</main>
      </div>
    </Theme>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
};

export default PageContainer;
