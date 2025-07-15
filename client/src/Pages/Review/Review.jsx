import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PageContainer } from '../../components/PageContainer/PageContainer';
import { Showcase } from '../../components/Showcase/Showcase';

const blockClass = `review`;

export const Review = ({ className }) => {
  return (
    <PageContainer
      className={classNames(className, blockClass)}
      title='Review'
      description='What you did with style....'
    >
      <Showcase className={`${blockClass}__showcase`} />
    </PageContainer>
  );
};

Review.propTypes = {
  className: PropTypes.string,
};

export default Review;
