import React, { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  register: UseFormRegisterReturn;
} & InputHTMLAttributes<HTMLInputElement>;

const CustomInput = ({ register, ...props }: Props) => {
  return <input {...register} {...props} />;
};

export default CustomInput;
