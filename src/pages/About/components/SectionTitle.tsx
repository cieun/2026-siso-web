import styled from 'styled-components';
import TextBox from '../../../components/common/TextBox';

interface SectionTitleProps {
  title: string;
  subTitle?: string;
  rotate?: number;
  fontSize?: string;
  marginTop?: string;
  marginBottom?: string;
}

const TitleWrapper = styled.div<{ $mt?: string; $mb?: string }>`
  display: flex;
  flex-direction: column;
  margin-top: ${({ $mt }) => $mt || '0'};
  margin-bottom: ${({ $mb }) => $mb || '60px'};
`;

const SectionTitle = ({
  title,
  subTitle,
  rotate = 15,
  fontSize = '4.5rem',
  marginTop,
  marginBottom,
}: SectionTitleProps) => {
  return (
    <TitleWrapper $mt={marginTop} $mb={marginBottom}>
      <TextBox
        paddingType="narrow"
        fontSize={fontSize}
        textAlign="left"
        rotate={rotate}
      >
        {title}
        {subTitle && <sup>{subTitle}</sup>}
      </TextBox>
    </TitleWrapper>
  );
};

export default SectionTitle;
