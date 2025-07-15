import PropTypes from 'prop-types';
import classNames from 'classnames';

import './app-header.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../config/routes';
import { useAppDataContext } from '../AppData';
import { useRef } from 'react';
import { ProfileForm } from '../ProfileForm/ProfileForm';
import { ThemeForm } from '../ThemeForm/ThemeForm';
import { Button, ButtonSet } from '@carbon/react';
import { Settings, User } from '@carbon/react/icons';

const blockClass = `app-header`;

export const AppHeader = ({ className }) => {
  const refProfileDialog = useRef(null);
  const refOptionsDialog = useRef(null);
  const nav = useNavigate();
  const appData = useAppDataContext();
  let location = useLocation();

  const handleReset = () => {
    const sure = confirm(
      'Reset your profile and all of your data. Are you sure?',
    );
    if (sure) {
      appData.dispatch({ reset: true });
      nav('/profile');
    }
  };

  const handleProfile = () => {
    refProfileDialog.current.showModal();
  };

  const doClose = (refDialog) => {
    refDialog.current.close();
  };
  const handleProfileSubmit = async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const formData = new FormData(ev.target);
    const formProps = Object.fromEntries(formData);

    appData.dispatch({ profile: formProps });
    doClose(refProfileDialog);
  };

  const handlePotentialBackdropClick = (ev, refDialog) => {
    const rect = refDialog.current.getBoundingClientRect();
    const clickInDialog =
      rect.top <= ev.clientY &&
      ev.clientY <= rect.top + rect.height &&
      rect.left <= ev.clientX &&
      ev.clientX <= rect.left + rect.width;

    if (!clickInDialog) {
      doClose(refDialog);
    }
  };

  const handleOptionsOpen = () => {
    refOptionsDialog.current.showModal();
  };

  const handleOptionsClose = () => {
    doClose(refOptionsDialog);
  };

  return (
    <header className={classNames(className, blockClass)}>
      <h1 className={`${blockClass}__title display-1`}>PlanDuVu</h1>
      <nav className={`${blockClass}__nav nav`}>
        {routes
          .filter((route) => route.path !== '/profile')
          .map((route) => (
            <a
              key={route.path}
              className={classNames(`${blockClass}__nav-item nav-link`, {
                [`active`]: route.path === location.pathname,
              })}
              aria-current={route.path === location.pathname ? 'page' : ''}
              href={route.path}
            >
              {route.label}
            </a>
          ))}
      </nav>
      <div
        className={`${blockClass}__menu`}
        role='toolbar'
        aria-label='Application toolbar'
      >
        <Button onClick={handleReset} type='button' kind='danger--ghost'>
          Reset
        </Button>

        <ButtonSet>
          <Button
            onClick={handleOptionsOpen}
            type='button'
            className={`${blockClass}__menu-button btn`}
            hasIconOnly
            renderIcon={(props) => <Settings size={20} {...props} />}
            iconDescription='Settings'
            tooltipAlignment='end'
            tooltipPosition='bottom'
            kind='ghost'
          />

          {appData?.state?.profile ? (
            <Button
              className={`${blockClass}__menu-button btn`}
              onClick={handleProfile}
              hasIconOnly
              renderIcon={(props) => <User size={20} {...props} />}
              iconDescription='User profile'
              tooltipAlignment='end'
              tooltipPosition='bottom'
              kind='ghost'
            />
          ) : null}
        </ButtonSet>
      </div>
      <dialog
        ref={refOptionsDialog}
        className={`${blockClass}__menu-dialog light card`}
        onClick={(ev) => handlePotentialBackdropClick(ev, refOptionsDialog)}
      >
        <h5 className='card-title'>Options</h5>
        <h5 className='card-subtitle text-muted'>Theme</h5>
        <ThemeForm></ThemeForm>

        <Button onClick={handleOptionsClose}>Done</Button>
      </dialog>

      <dialog
        ref={refProfileDialog}
        className={`${blockClass}__menu-dialog light card`}
        onClick={(ev) => handlePotentialBackdropClick(ev, refProfileDialog)}
      >
        <h5>Profile</h5>
        <ProfileForm onSubmit={handleProfileSubmit} />
      </dialog>
    </header>
  );
};

AppHeader.propTypes = {
  active: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  onReset: PropTypes.func,
};

export default AppHeader;
