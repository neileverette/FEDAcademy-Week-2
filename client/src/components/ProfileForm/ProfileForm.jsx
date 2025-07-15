import PropTypes from 'prop-types';
import classNames from 'classnames';

import './profile-form.scss';
import { useAppDataContext } from '../AppData';
import { Button, Form, Layer, TextInput } from '@carbon/react';

const blockClass = `profile-form`;

export const ProfileForm = ({ autoComplete, className, onSubmit }) => {
  const appData = useAppDataContext();

  return (
    <Layer className={classNames(className, blockClass)} onSubmit={onSubmit}>
      <Form className={`${blockClass}__form`} autoComplete={autoComplete}>
        <TextInput
          labelText='First name'
          className={`${blockClass}__input`}
          id='firstName'
          name='firstName'
          required
          defaultValue={appData?.state?.profile?.firstName}
          autoComplete={autoComplete}
        />

        <TextInput
          labelText='Surname'
          className={`${blockClass}__input`}
          id='surname'
          name='surname'
          required
          defaultValue={appData?.state?.profile?.surname}
          autoComplete={autoComplete}
        />

        <TextInput
          labelText='email'
          className={`${blockClass}__input`}
          id='email'
          name='email'
          type='email'
          defaultValue={appData?.state?.profile?.email}
          autoComplete={autoComplete}
        />
        {onSubmit && <Button type='submit'>OK</Button>}
      </Form>
    </Layer>
  );
};

ProfileForm.propTypes = {
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default ProfileForm;
