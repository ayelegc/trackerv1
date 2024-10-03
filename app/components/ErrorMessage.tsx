import { Text } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

const ErrorMessage = ({ children }: PropsWithChildren) => {
    if(!children) return null;
  return (
    <Text color="red.500" as="p">
      {children}
    </Text>
  );
};

export default ErrorMessage;
