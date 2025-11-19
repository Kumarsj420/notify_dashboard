import type {
  FieldError,
  FieldPath,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormProps,
  UseFormRegisterReturn,
} from 'react-hook-form';

import get from 'lodash/get';
import { DeepRequired, FieldErrorsImpl, Merge, useForm as useReactHookForm } from 'react-hook-form';

interface useFormInputFieldsReturn<T extends FieldPath<FieldValues>>
  extends UseFormRegisterReturn<T> {
  defaultValue?: string;
  error?: string;
}

export const useForm = <T extends FieldValues>(props: UseFormProps<T>) => {
  const { register, formState, watch, ...rest } = useReactHookForm<T>(props);

  const setValueAs = (value: unknown) => {
    if (!value) {
      return undefined;
    }
    return value;
  };

  const isFieldError = (
    value: FieldError | Merge<FieldError, FieldErrorsImpl<DeepRequired<T>[string]>> | undefined,
  ): value is FieldError =>
    !!value && typeof value === 'object' && 'type' in value && 'message' in value;

  const getInputFields = (
    fieldName: Path<T>,
    options?: RegisterOptions<T>,
  ): useFormInputFieldsReturn<Path<T>> => {
    const registerProps = register(fieldName, { setValueAs, ...options });
    const error = get(formState.errors, fieldName);
    const defaultValue = get(formState.defaultValues, fieldName);
    return {
      ...registerProps,
      defaultValue,
      error: isFieldError(error) ? error.message : error ? String(error) : undefined,
    };
  };

  return {
    getInputFields,
    formState,
    watch,
    ...rest,
  };
};

export type UseFormReturn<T extends FieldValues> = ReturnType<typeof useForm<T>>; 