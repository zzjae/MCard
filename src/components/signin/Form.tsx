import Flex from '@shared/Flex';
import TextField from '@shared/TextField';
import Button from '@shared/Button';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import Spacing from '@/components/shared/Spacing';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import Text from '@/components/shared/Text';
import { colors } from '@/styles/colorPalette';
import validator from 'validator';
import { FormValues } from '@/models/signin';

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const errors = useMemo(() => validate(formValues), [formValues]);

  const Ok = Object.keys(errors).length === 0;

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="abcd@gmail.com"
        onChange={handleFormValues}
        value={formValues.email}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        name="password"
        type="password"
        onChange={handleFormValues}
        value={formValues.password}
      />
      <Spacing size={32} />

      <Button
        size="medium"
        disabled={Ok === false}
        onClick={() => {
          onSubmit(formValues);
        }}
      >
        로그인
      </Button>

      <Spacing size={12} />

      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  );
}

const formContainerStyles = css`
  padding: 24px;
`;

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`;

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {};

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요';
  }

  if (formValues.password.length < 10) {
    errors.password = '비밀번호는 10자 이상이여야 합니다';
  }

  return errors;
}

export default Form;
