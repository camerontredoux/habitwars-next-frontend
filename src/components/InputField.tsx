import {
  ComponentWithAs,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconProps,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes, ReactElement } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  ariaLabel: string;
  placeholder: string;
  name: string;
  icon: ReactElement<any, any>;
};

export const InputField: React.FC<InputFieldProps> = ({
  size,
  icon,
  ariaLabel,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error} mt={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={icon} />
        <Input aria-label={ariaLabel} {...field} {...props} id={field.name} />
      </InputGroup>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
