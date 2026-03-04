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
  background: transparent;
  width: ${({ $width }) => $width || 'fit-content'};
  transform: rotate(${({ $rotate }) => $rotate}deg);
  display: inline-flex;
  flex-direction: column;
  box-sizing: border-box;

  text-align: ${({ $textAlign }) => $textAlign};
  align-items: ${({ $textAlign }) =>
    $textAlign === 'center'
      ? 'center'
      : $textAlign === 'right'
        ? 'flex-end'
        : 'flex-start'};

  span.content-text {
    background: #fff;
    padding: ${({ $paddingType }) =>
      $paddingType === 'narrow'
        ? '0.1em 0.57em'
        : $paddingType === 'wide'
          ? '0.75em 1.3em'
          : '0.35em 0.89em'}; /* default 값 */
    line-height: 1.7;
    display: inline-block;

    font-size: ${({ $fontSize }) => $fontSize};
    font-weight: ${({ $fontWeight }) => $fontWeight};

    word-break: keep-all;
    white-space: pre-wrap;

    sup {
      font-size: 0.45em;
      margin-left: 0.4em;
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
