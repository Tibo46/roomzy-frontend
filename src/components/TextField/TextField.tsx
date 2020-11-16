import React from 'react';

import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@material-ui/core/TextField';
import useForkRef from '@material-ui/core/utils/useForkRef';

export type TextFieldProps = MuiTextFieldProps & {
  errorMessage?: string;
};

function TextField(
  {
    helperText,
    error,
    errorMessage,
    inputRef: inputRefProp,
    required,
    label,
    ...props
  }: TextFieldProps,
  ref: any
) {
  const [isValid, setIsValid] = React.useState(true);
  const [hasBeenInteractedWith, setHasBeenInteractedWith] = React.useState(
    false
  );

  const inputRef = React.useRef<HTMLInputElement>();
  const handleInputRef = useForkRef(inputRef, inputRefProp || null);

  React.useEffect(() => {
    if (props.value && !hasBeenInteractedWith) {
      setHasBeenInteractedWith(true);
    }

    if (inputRef.current && hasBeenInteractedWith) {
      setIsValid(inputRef.current.checkValidity());
    }
  }, [props.value, hasBeenInteractedWith, required]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsValid(event.currentTarget.checkValidity());
    setHasBeenInteractedWith(true);

    if (props.onChange) {
      props.onChange(event);
    }
  }

  function handleInvalid(event: React.InvalidEvent<HTMLInputElement>) {
    setIsValid(false);
    setHasBeenInteractedWith(true);

    if (props.onInvalid) {
      props.onInvalid(event);
    }
  }

  const showAsError = typeof error !== 'undefined' ? error : !isValid;

  return (
    <>
      <MuiTextField
        {...props}
        ref={ref}
        fullWidth={true}
        inputRef={handleInputRef}
        label={label}
        helperText={
          showAsError ? (
            <>
              {helperText && (
                <>
                  {helperText}
                  <br />
                </>
              )}

              {errorMessage}
            </>
          ) : (
            helperText
          )
        }
        error={showAsError}
        required={required}
        onChange={handleChange}
        onInvalid={handleInvalid}
      />
    </>
  );
}

export default React.forwardRef(TextField);
