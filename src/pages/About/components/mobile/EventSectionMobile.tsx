import styled from 'styled-components';
import { eventData } from '../../data/eventData';
import { AboutSection } from '../AboutSection';
import SectionTitle from '../SectionTitle';

import StampImg from '../../assets/event_stamp.svg';
import SeesawImg from '../../assets/event_siso.svg';

const EventContainer = styled(AboutSection)`
  position: relative;
`;

const LeftColumn = styled.div`
  position: relative;
`;

const BgBox = styled.div`
  position: relative;
  width: 100%;
  height: 40vh;
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
  z-index: 1;
  width: ${({ $width }) => $width || 'auto'};
  pointer-events: none;
`;

const EventBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;
`;

const TitleGroup = styled.div`
  margin-bottom: 10px;
  text-align: center;
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
  margin: 20px 0 20px 0;
  border: none;
  border-top: 2px solid #000;
`;

const Description = styled.p`
  font-weight: 800;
  word-break: keep-all;
`;

const EventSectionMobile = () => {
  return (
    <EventContainer>
      <LeftColumn>
        <SectionTitle title={eventData.title} subTitle={eventData.subTitle} />
        <BgBox>
          <BgGraphic src={StampImg} $top="-80px" $left="130px" $width="200px" />
          <BgGraphic
            src={SeesawImg}
            $bottom="30px"
            $left="-650px"
            $width="900px"
          />
        </BgBox>
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

export default EventSectionMobile;
