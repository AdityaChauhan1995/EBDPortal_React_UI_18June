import React from 'react';
import { Button } from 'semantic-ui-react';

export const PrimaryButton = ({
  ...props
}) => {

  return (
    <Button {...props}
      primary
      style={{ height: 35, }}
      onClick={() => props.onClick()}>
      {props.value}
    </Button>
  )
}

export const SecondaryButton = ({
  ...props
}) => {
  let styleNormal = {height: 35};
  let styleCompact = {height: 28}
  return (
    <Button  {...props}
      basic
      style={props.compact?styleCompact:styleNormal}
      onClick={() => props.onClick()}>
      <b>{props.value}</b>
    </Button>
  )
}
