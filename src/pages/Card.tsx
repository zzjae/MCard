import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCard } from '@/remote/card';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import Top from '@shared/Top';
import ListRow from '@/components/shared/ListRow';
import FixedBottomButton from '@/components/shared/FixedBottonButton';
import Flex from '@/components/shared/Flex';
import Text from '@/components/shared/Text';

function CardPage() {
  const { id = '' } = useParams();

  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '',
  });

  if (data == null) {
    return null;
  }

  const { name, corpName, promotion, tags, benefit } = data;

  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(', ');
  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />
      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              initial={{
                opacity: 0,
                translateX: -90,
              }}
              whileInView={{
                opacity: 1,
                translateX: 0,
              }}
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
                delay: index * 0.1,
              }}
              // animate={{
              //   opacity: 1,
              //   translateX: 0,
              // }}
            >
              <ListRow
                as="div"
                key={text}
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          );
        })}
      </ul>

      {promotion != null ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}
      <FixedBottomButton label="신청하기" onClick={() => {}} />
    </div>
  );
}

function removeHtmlTags(text: string) {
  let output = '';

  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === '<') {
      for (let j = i + 1; j < text.length; j += 1) {
        if (text[j] === '>') {
          i = j;
          break;
        }
      }
    } else {
      output += text[i];
    }
  }
  return output;
}

function IconCheck() {
  return (
    <svg
      height="20px"
      version="1.1"
      viewBox="0 0 20 20"
      width="20px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title />
      <desc />
      <defs />
      <g
        fill="none"
        fill-rule="evenodd"
        id="Page-1"
        stroke="none"
        stroke-width="1"
      >
        <g
          fill="#000000"
          id="Core"
          transform="translate(-128.000000, -86.000000)"
        >
          <g
            id="check-circle-outline"
            transform="translate(128.000000, 86.000000)"
          >
            <path
              d="M5.9,8.1 L4.5,9.5 L9,14 L19,4 L17.6,2.6 L9,11.2 L5.9,8.1 L5.9,8.1 Z M18,10 C18,14.4 14.4,18 10,18 C5.6,18 2,14.4 2,10 C2,5.6 5.6,2 10,2 C10.8,2 11.5,2.1 12.2,2.3 L13.8,0.7 C12.6,0.3 11.3,0 10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 L18,10 L18,10 Z"
              id="Shape"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px;
`;

export default CardPage;
