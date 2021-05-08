import React from 'react';
import { Field } from 'react-final-form';
import { TextField } from '@material-ui/core';

import { validateRequired } from '../../utils/validators';

const fieldValidator = required => value => {
  if (required && !validateRequired(value)) {
    return 'Required';
  }

  return undefined;
};

export default function Input({
  name,
  label,
  required,
  error,
  type,
  ...other
}) {
  return (
    <Field
      name={name}
      validate={fieldValidator(required)}
      render={({ input, meta }) => (
        <TextField
          id={name}
          label={label}
          type={type}
          fullWidth
          error={meta.touched && (!!meta.error || !!error)}
          helperText={meta.touched && (meta.error || error)}
          required={required}
          {...other}
          {...input}
        />
      )}
    />
  );
}
