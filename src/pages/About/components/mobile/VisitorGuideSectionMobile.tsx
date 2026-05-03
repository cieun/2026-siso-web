import styled from 'styled-components';
import { useState } from 'react';
import { visitorGuideData } from '../../data/visitorGuideData';
import { AboutSection } from '../AboutSection';
import SectionTitle from '../SectionTitle';
import TextBox from '../../../../components/common/TextBox';

import mapR from '../../assets/map_r.svg';
import mapS from '../../assets/map_s.svg';
import mapR1f from '../../assets/map_r1f.svg';
import mapS3f from '../../assets/map_s3f.svg';
import schooMap from '../../assets/school_map.svg';
import arrow from '../../assets/arrow.svg';

const BUILDING_LAYOUTS = [
  {
    image: mapR,
    width: '82%',
    hoverWidth: '70%',
    pos: { top: '250px', right: '20%' },
    labelPos: { top: '170px', right: '10px' },
  },
  {
    image: mapS,
    width: '77%',
    hoverWidth: '77%',
    pos: { top: '470px', right: '40%' },
    labelPos: { top: '80px', right: '250px' },
  },
];

const SectionContainer = styled(AboutSection)`
  display: flex;
  flex-direction: column;
  position: relative;
  height: auto;
  min-height: 100vh;
`;

const GuideContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  width: 100%;
`;

const InfoContent = styled.div`
  position: relative;
  width: 100%;
  height: 40vh;
`;

const SchoolMap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
  img {
    width: 100%;
    max-width: 320px;
    height: auto;
  }
`;

const PositionWrapper = styled.div<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $cursor?: string;
}>`
  position: absolute;
  top: ${({ $top }) => $top || '0'};
  bottom: ${({ $bottom }) => $bottom || 'auto'};
  left: ${({ $left }) => $left || 'auto'};
  right: ${({ $right }) => $right || 'auto'};
  cursor: ${({ $cursor }) => $cursor || 'default'};
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const BuildingRow = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const MapBox = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  margin: 30px 0;
`;

const BaseMapImage = styled.img<{ $width: string }>`
  width: ${({ $width }) => $width};
  height: auto;
  transition:
    transform 0.4s ease-in-out,
    opacity 0.4s ease-in-out;
`;

const DefaultMapImage = styled(BaseMapImage)<{ $isHovered: boolean }>`
  position: relative;
  z-index: ${({ $isHovered }) => ($isHovered ? 1 : 2)};
  transform: scale(${({ $isHovered }) => ($isHovered ? 0 : 1)});
  opacity: ${({ $isHovered }) => ($isHovered ? 0 : 1)};
`;

const HoverMapImage = styled(BaseMapImage)<{
  $isHovered: boolean;
  $width: string;
}>`
  position: absolute;
  top: 0;
  left: 50%;
  z-index: ${({ $isHovered }) => ($isHovered ? 2 : 1)};
  width: ${({ $width }) => $width};
  transform: translate(-50%, 0)
    scale(${({ $isHovered }) => ($isHovered ? 1 : 0)});
  opacity: ${({ $isHovered }) => ($isHovered ? 1 : 0)};
`;

const TeamListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TeamList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  margin-top: 30px;
`;

const TeamRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TeamName = styled.span`
  font-size: 2.2rem;
  font-weight: 800;
  color: #000;
`;

const VisitorGuideSectionMobile = () => {
  const mapImages = [mapR, mapS];
  const hoverImages = [mapR1f, mapS3f];

  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const handleToggle = (idx: number) => {
    setActiveIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  return (
    <SectionContainer>
      <GuideContent>
        <InfoContent>
          <PositionWrapper $top="26px" $left="0">
            <SectionTitle
              title={visitorGuideData.title}
              subTitle={visitorGuideData.subTitle}
            />
          </PositionWrapper>
          <PositionWrapper $top="138px" $left="230px">
            <TextBox fontSize="1.8rem" width="70px" rotate={-10}>
              <img src={arrow} style={{ width: '100%', display: 'block' }} />
            </TextBox>
          </PositionWrapper>
          <PositionWrapper $top="186px">
            <TextBox
              paddingType="wide"
              fontSize="1.8rem"
              fontWeight={600}
              rotate={3}
              width="300px"
            >
              {visitorGuideData.description}
            </TextBox>
          </PositionWrapper>
        </InfoContent>
        <SchoolMap>
          <img src={schooMap} />
        </SchoolMap>
      </GuideContent>

      <RightColumn>
        {visitorGuideData.buildingLists.map((group, idx) => {
          const isActivated = activeIndices.includes(idx);
          const layout = BUILDING_LAYOUTS[idx];

          return (
            <BuildingRow key={idx}>
              <TextBox fontSize="2.5rem" paddingType="narrow">
                {group.building}
              </TextBox>
              <MapBox
                onClick={() => handleToggle(idx)}
                style={{ cursor: 'pointer' }}
              >
                <DefaultMapImage
                  $isHovered={isActivated}
                  $width={layout.width}
                  src={mapImages[idx]}
                  alt={`${group.building}`}
                />
                <HoverMapImage
                  $isHovered={isActivated}
                  $width={layout.hoverWidth}
                  src={hoverImages[idx]}
                  alt={`${group.building}`}
                />
              </MapBox>
              <TeamListWrapper>
                <TeamList>
                  {group.teams.map((team) => (
                    <TeamRow key={team.id}>
                      <TextBox
                        fontSize="2rem"
                        paddingType="narrow"
                        textAlign="center"
                      >
                        {team.id}
                      </TextBox>
                      <TeamName>{team.name}</TeamName>
                    </TeamRow>
                  ))}
                </TeamList>
              </TeamListWrapper>
            </BuildingRow>
          );
        })}
      </RightColumn>
    </SectionContainer>
  );
};

export default VisitorGuideSectionMobile;
