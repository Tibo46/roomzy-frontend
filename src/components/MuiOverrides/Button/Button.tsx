import React from 'react';

import classNames from 'clsx';

import MuiCircularProgress from '@material-ui/core/CircularProgress';
import MuiButton, {
  ButtonProps as MuiButtonProps,
} from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },

  noneMargin: {
    marginTop: 0,
    marginBottom: 0,
  },
  denseMargin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  normalMargin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  loader: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
  },

  icon: {
    display: 'inline-flex',
    marginRight: theme.spacing(1),
  },
}));

interface ButtonProps extends Omit<MuiButtonProps, 'classes'> {
  margin?: 'none' | 'dense' | 'normal';
  loading?: boolean;
  icon?: React.ReactNode;
}
type MarginClassName = 'noneMargin' | 'denseMargin' | 'normalMargin';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  margin = 'normal',
  className,
  disabled = false,
  loading = false,
  color = 'primary',
  icon,
  disableElevation = true,
  ...props
}) => {
  const classes = useStyles();
  const marginClassName = `${margin}Margin` as MarginClassName;

  return (
    <MuiButton
      variant={variant}
      color={color}
      className={classNames(classes.root, classes[marginClassName], className)}
      disabled={loading || disabled}
      disableElevation={disableElevation}
      {...props}
    >
      {icon && <span className={classes.icon}>{icon}</span>}
      {children}
      {loading && (
        <span className={classes.loader}>
          <MuiCircularProgress
            color={color === 'secondary' ? 'secondary' : 'primary'}
            size={25}
          />
        </span>
      )}
    </MuiButton>
  );
};

export default Button;
