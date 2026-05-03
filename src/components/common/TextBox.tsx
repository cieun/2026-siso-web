import styled from 'styled-components';

type PaddingType = 'default' | 'narrow' | 'wide';

interface TextBoxProps {
  children: React.ReactNode;
  textAlign?: 'left' | 'center' | 'right';
  rotate?: number;
  width?: string;
  fontSize?: string;
  fontWeight?: number | string;
  paddingType?: PaddingType;
}

const StyledBox = styled.div<{
  $textAlign: string;
  $rotate: number;
  $width?: string;
  $fontSize?: string;
  $fontWeight: number | string;
  $paddingType: PaddingType;
}>`
  display: inline-flex;
  flex-direction: column;
  align-items: ${({ $textAlign }) =>
    $textAlign === 'center'
      ? 'center'
      : $textAlign === 'right'
        ? 'flex-end'
        : 'flex-start'};
  box-sizing: border-box;
  width: ${({ $width }) => $width || 'fit-content'};
  text-align: ${({ $textAlign }) => $textAlign};
  background: transparent;
  transform: rotate(${({ $rotate }) => $rotate}deg);

  span.content-text {
    display: inline-block;
    padding: ${({ $paddingType }) =>
      $paddingType === 'narrow'
        ? '0.1em 0.57em'
        : $paddingType === 'wide'
          ? '0.75em 1.3em'
          : '0.35em 0.89em'}; /* default */
    font-size: ${({ $fontSize }) => $fontSize};
    font-weight: ${({ $fontWeight }) => $fontWeight};
    line-height: 1.7;
    word-break: keep-all;
    white-space: pre-wrap;
    background: #fff;

    sup {
      margin-left: 0.4em;
      font-size: 0.45em;
      vertical-align: super;
    }

    &:not(:first-child) {
      margin-top: -0.4em;
      padding-top: 0;
    }
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: inherit;
`;

const TextBox = ({
  children,
  textAlign = 'left',
  rotate = 0,
  width,
  fontSize = '18rem',
  fontWeight = 800,
  paddingType = 'default',
}: TextBoxProps) => {
  const isString = typeof children === 'string';
  const lines = isString ? children.split('\n') : [children];

  return (
    <StyledBox
      $textAlign={textAlign}
      $rotate={rotate}
      $width={width}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $paddingType={paddingType}
    >
      <TextWrapper>
        {lines.map((line, index) => (
          <span key={index} className="content-text">
            {line}
          </span>
        ))}
      </TextWrapper>
    </StyledBox>
  );
};

export default TextBox;
