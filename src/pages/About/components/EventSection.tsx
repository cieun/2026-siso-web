import styled from 'styled-components';
import { AboutSection } from './AboutSection';
import SectionTitle from './SectionTitle';
import { eventData } from '../data/eventData';

import StampImg from '../assets/event_stamp.svg';
import SeesawImg from '../assets/event_siso.svg';

const EventContainer = styled(AboutSection)`
  position: relative;
`;

const LeftColumn = styled.div`
  position: relative;
`;

const EventBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 120px;
`;

const TitleGroup = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const EngTitle = styled.h2`
  font-size: 4.8rem;
  font-weight: 800;
`;

const KorTitle = styled.p`
  font-size: 1.8rem;
  font-weight: 800;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 3px solid #000;
  margin: 20px 0 20px 0;
`;

const Description = styled.p`
  font-weight: 800;
  word-break: keep-all;
`;

const BgGraphic = styled.img<{
  $top?: string;
  $left?: string;
  $bottom?: string;
  $right?: string;
  $width?: string;
}>`
  position: absolute;
  top: ${({ $top }) => $top || 'auto'};
  bottom: ${({ $bottom }) => $bottom || 'auto'};
  left: ${({ $left }) => $left || 'auto'};
  right: ${({ $right }) => $right || 'auto'};
  width: ${({ $width }) => $width || 'auto'};
  z-index: 1;
  pointer-events: none;

  @media (min-width: 768px) and (max-width: 1400px) {
    width: ${({ $width }) => ($width ? `calc(${$width} * 0.7)` : 'auto')};
    top: ${({ $top }) => ($top ? `calc(${$top} * 0.7)` : 'auto')};
    left: ${({ $left }) => ($left ? `calc(${$left} * 0.7)` : 'auto')};
    bottom: ${({ $bottom }) => ($bottom ? `calc(${$bottom} * 8)` : 'auto')};
  }
`;

const EventSection = () => {
  return (
    <EventContainer>
      <LeftColumn>
        <SectionTitle title={eventData.title} subTitle={eventData.subTitle} />
        <BgGraphic src={StampImg} $top="-80px" $left="220px" $width="500px" />
        <BgGraphic
          src={SeesawImg}
          $bottom="30px"
          $left="-850px"
          $width="1400px"
        />
      </LeftColumn>
      <div>
        {eventData.contents.map((item, idx) => (
          <EventBox key={idx}>
            <TitleGroup>
              <EngTitle>{item.engTitle}</EngTitle>
              <KorTitle>{item.korTitle}</KorTitle>
            </TitleGroup>
            <Divider />
            <Description>{item.description}</Description>
          </EventBox>
        ))}
      </div>
    </EventContainer>
  );
};

export default EventSection;
