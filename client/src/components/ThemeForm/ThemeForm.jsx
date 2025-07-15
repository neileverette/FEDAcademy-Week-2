import PropTypes from 'prop-types';
import classNames from 'classnames';

import './theme-form.scss';
import { useAppConfigContext } from '../AppConfig';
import { RadioButton, RadioButtonGroup } from '@carbon/react';

const blockClass = `theme-form`;

export const ThemeForm = ({ className, onSubmit }) => {
  const appConfig = useAppConfigContext();

  const handleChange = (newValue) => {
    appConfig.setTheme(newValue);
  };

  return (
    <form className={classNames(className, blockClass)} onSubmit={onSubmit}>
      <RadioButtonGroup
        orientation='vertical'
        onChange={handleChange}
        name='theme'
      >
        <RadioButton
          className={`${blockClass}__input`}
          id='default'
          name='theme'
          value='default'
          type='radio'
          checked={appConfig.state.themeSetting === 'default'}
          labelText='Default (system)'
        />

        <RadioButton
          className={`${blockClass}__input`}
          id='light'
          name='theme'
          value='light'
          type='radio'
          checked={appConfig.state.themeSetting === 'light'}
          labelText='Light'
        />

        <RadioButton
          className={`${blockClass}__input`}
          id='dark'
          name='theme'
          value='dark'
          type='radio'
          checked={appConfig.state.themeSetting === 'dark'}
          labelText='Dark'
        />
      </RadioButtonGroup>
    </form>
  );
};

ThemeForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default ThemeForm;
