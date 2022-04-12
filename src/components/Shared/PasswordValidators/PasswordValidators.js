import React, { useEffect, useState } from 'react';

const PasswordValidators = ({
  touched,
  errors,
  id,
  watchPassword,
  setIsValidPassword,
}) => {
  const [status, setStatus] = useState({
    lowerCase: false,
    upperCase: false,
    special: false,
  });
  const lowerCase = /[a-z]/;
  const upperCase = /[A-Z]/;
  const specialTest = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

  useEffect(() => {
    if (watchPassword) {
      const aux = {
        lowerCase: lowerCase.test(watchPassword),
        upperCase: upperCase.test(watchPassword),
        special: specialTest.test(watchPassword),
      };
      const auxIsValid =
        aux.lowerCase && aux.upperCase && aux.special;
      setIsValidPassword((prev) => auxIsValid);
      setStatus((prev) => aux);
    } else {
      const aux = {
        lowerCase: false,
        upperCase: false,
        special: false,
      };
      setIsValidPassword(false);
      setStatus((prev) => aux);
    }
  }, [watchPassword]);
  return (
    <div className="flex flex-col sm:flex-row sm:gap-6 password-validations ml-6 mb-4">
      <div>
        <ul>
          <li
            className={`text-sm validation-requirement ${
              // eslint-disable-next-line no-nested-ternary
              status.lowerCase
                ? 'filled'
                : // eslint-disable-next-line no-nested-ternary
                (errors && errors.password) ||
                  ((touched || watchPassword) && !status.lowerCase)
                ? 'error'
                : (touched || watchPassword) && !errors
                ? 'touched'
                : ''
            }`}
          >
            Una minúscula
          </li>
          <li
            className={`text-sm validation-requirement ${
              // eslint-disable-next-line no-nested-ternary
              status.upperCase
                ? 'filled'
                : // eslint-disable-next-line no-nested-ternary
                (errors && errors.password) ||
                  ((touched || watchPassword) && !status.upperCase)
                ? 'error'
                : (touched || watchPassword) && !errors
                ? 'touched'
                : ''
            }`}
          >
            Una mayúscula
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li
            className={`text-sm validation-requirement ${
              // eslint-disable-next-line no-nested-ternary
              watchPassword && watchPassword.length >= 8
                ? 'filled'
                : // eslint-disable-next-line no-nested-ternary
                (errors && errors.password) ||
                  (touched &&
                    watchPassword &&
                    watchPassword.length < 8)
                ? 'error'
                : (touched || watchPassword) && !errors
                ? 'touched'
                : ''
            }`}
          >
            Ocho caracteres mínimo
          </li>
          <li
            className={`text-sm validation-requirement ${
              // eslint-disable-next-line no-nested-ternary
              status.special
                ? 'filled'
                : // eslint-disable-next-line no-nested-ternary
                (errors && errors.password) ||
                  ((touched || watchPassword) && !status.special)
                ? 'error'
                : (touched || watchPassword) && !errors
                ? 'touched'
                : ''
            }`}
          >
            Un caracter especial
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordValidators;
