import PropTypes from 'prop-types';
import classNames from 'classnames';

import './profile.scss';
import { PageContainer } from '../../components/PageContainer/PageContainer';
import { useNavigate } from 'react-router-dom';
import { useAppDataContext } from '../../components/AppData';
import { ProfileForm } from '../../components/ProfileForm/ProfileForm';

const blockClass = `page-profile`;

export const Profile = ({ className }) => {
  const nav = useNavigate();
  const appData = useAppDataContext();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const formData = new FormData(ev.target);
    const formProps = Object.fromEntries(formData);

    appData.dispatch({ profile: formProps });

    nav('/');
  };

  return (
    <PageContainer
      className={classNames(blockClass, className)}
      title='Tasks'
      description='Live tasks that you are still engaged with.'
    >
      <ProfileForm
        className={`${blockClass}__form`}
        onSubmit={handleSubmit}
      ></ProfileForm>
    </PageContainer>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Profile;
