import Flex from '@shared/Flex';
import TextField from '@shared/TextField';
import FixedBottomButton from '@shared/FixedBottonButton';
import Spacing from '@shared/Spacing';

import { css } from '@emotion/react';

function Form() {
  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField label="이메일" placeholder="abcd@gmail.com" />
      <Spacing size={16} />
      <TextField label="패스워드" type="password" />
      <Spacing size={16} />
      <TextField label="패스워드 재확인" type="password" />
      <Spacing size={16} />
      <TextField label="이름" placeholder="홍길동" />

      <FixedBottomButton label="회원가입" disabled={true} onClick={() => {}} />
    </Flex>
  );
}

const formContainerStyles = css`
  padding: 24px;
`;

export default Form;
