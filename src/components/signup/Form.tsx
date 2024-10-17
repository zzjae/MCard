import Flex from '@shared/Flex';
import TextField from '@shared/TextField';
import FixedBottomButton from '@shared/FixedBottonButton';
import Spacing from '@shared/Spacing';
import validator from 'validator';

import { css } from '@emotion/react';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { FormValues } from '@/models/signup';

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  });

  const [dirty, setDirty] = useState<Partial<FormValues>>({});

  const errors = useMemo(() => validate(formValues), [formValues]);

  const Ok = Object.keys(errors).length === 0;

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: 'true',
    }));
  }, []);

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="abcd@gmail.com"
        value={formValues.email}
        onChange={handleFormValues}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드 재확인"
        name="rePassword"
        type="password"
        value={formValues.rePassword}
        onChange={handleFormValues}
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        helpMessage={Boolean(dirty.rePassword) ? errors.rePassword : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        placeholder="홍길동"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={Boolean(dirty.name) ? errors.name : ''}
        onBlur={handleBlur}
      />

      <FixedBottomButton
        label="회원가입"
        disabled={Ok === false}
        onClick={() => {
          onSubmit(formValues);
        }}
      />
    </Flex>
  );
}

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {};

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요';
  }

  if (formValues.password.length < 10) {
    errors.password = '비밀번호는 10자 이상이여야 합니다';
  }

  if (formValues.rePassword.length < 10) {
    errors.rePassword = '비밀번호는 10자 이상이여야 합니다';
  } else if (
    validator.equals(formValues.password, formValues.rePassword) === false
  ) {
    errors.password = '비밀번호를 확인해주세요';
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상이여야 합니다';
  }

  return errors;
}

const formContainerStyles = css`
  padding: 24px;
`;

export default Form;
