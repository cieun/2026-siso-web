import { useState } from 'react';
import styled from 'styled-components';
import { AboutSection } from './AboutSection';
import { visitorGuideData } from '../data/visitorGuideData';
import TextBox from '../../../components/common/TextBox';
import SectionTitle from './SectionTitle';

import mapR from '../assets/map_r.svg';
import mapS from '../assets/map_s.svg';
import mapR1f from '../assets/map_r1f.svg';
import mapS3f from '../assets/map_s3f.svg';
import schooMap from '../assets/school_map.svg';
import arrow from '../assets/arrow.svg';

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
  position: relative;
  height: auto;
  min-height: 100vh;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  gap: 120px;
`;

// 왼쪽 단

const GuideContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
`;

const InfoContent = styled.div`
  position: relative;
  width: 100%;
  height: 35vh;
`;

const SchoolMap = styled.div`
  width: 100%;
  height: 42vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
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

// const BuildingContainer = styled.div<{
//   $top?: string;
//   $bottom?: string;
//   $left?: string;
//   $right?: string;
// }>`
//   width: 280px;
//   height: 280px;
//   position: absolute;
//   top: ${({ $top }) => $top || '0'};
//   //   bottom: ${({ $bottom }) => $bottom || '0'};
//   //   left: ${({ $left }) => $left || '0'};
//   right: ${({ $right }) => $right || '0'};
// `;

// const BuildingImage = styled.img`
//   width: 300px;
//   height: auto;
//   position: absolute;
// `;

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0, 0, 0, 0.3);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// const MapModal = styled.div`
//   position: relative;
//   width: 60vw;
//   max-width: 800px;
//   aspect-ratio: 1.4 / 1;
//   background: ${({ theme }) =>
//     `linear-gradient(180deg, ${theme.colors.oceanWater} 0%, ${theme.colors.background} 100%)`};
//   border-radius: 40px;
//   box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 40px;
//   animation: modalShow 0.3s ease-out;

//   @keyframes modalShow {
//     from {
//       opacity: 0;
//       transform: scale(0.9);
//     }
//     to {
//       opacity: 1;
//       transform: scale(1);
//     }
//   }
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 30px;
//   right: 30px;
//   background: none;
//   border: none;
//   font-size: 3.2rem;
//   font-weight: 800;
//   cursor: pointer;
//   color: #000;
//   z-index: 1001;
// `;

// const FullMapImage = styled.img`
//   width: 100%;
//   height: auto;
//   object-fit: contain;
//   position: relative;
//   top: -30px;
//   left: 40px;
// `;

// 오른쪽 단

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const BuildingRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;
  gap: 20px;
  height: 40vh;
`;

const MapBox = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  position: relative;
  width: 100%;
  height: 100%;
`;

const BaseMapImage = styled.img<{ $width: string }>`
  width: ${({ $width }) => $width};
  min-width: 200px;
  height: auto;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);

  transition:
    transform 0.4s ease-in-out,
    opacity 0.4s ease-in-out;
`;

const DefaultMapImage = styled(BaseMapImage)<{ $isHovered: boolean }>`
  transform: translate(-50%, 0)
    scale(${({ $isHovered }) => ($isHovered ? 0 : 1)});
  opacity: ${({ $isHovered }) => ($isHovered ? 0 : 1)};
  z-index: ${({ $isHovered }) => ($isHovered ? 1 : 2)};
`;

const HoverMapImage = styled(BaseMapImage)<{
  $isHovered: boolean;
  $width: string;
}>`
  transform: translate(-50%, 0)
    scale(${({ $isHovered }) => ($isHovered ? 1 : 0)});
  opacity: ${({ $isHovered }) => ($isHovered ? 1 : 0)};
  z-index: ${({ $isHovered }) => ($isHovered ? 2 : 1)};

  width: ${({ $width }) => $width};
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

const VisitorGuideSection = () => {
  const mapImages = [mapR, mapS];
  const hoverImages = [mapR1f, mapS3f];
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const handleToggle = (idx: number) => {
    setActiveIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  return (
    <SectionContainer>
      {/* 왼쪽 단 */}
      <GuideContent>
        <InfoContent>
          <PositionWrapper $top="26px" $left="0">
            <SectionTitle
              title={visitorGuideData.title}
              subTitle={visitorGuideData.subTitle}
            />
          </PositionWrapper>
          <PositionWrapper
            $top="134px"
            $left="230px"
            // onClick={() => setIsModalOpen(true)}
          >
            {/* <TextBox fontSize="1.8rem">
            <u>{visitorGuideData.mapNavigator}</u>
          </TextBox> */}
            <TextBox fontSize="1.8rem" width="80px">
              <img src={arrow} style={{ width: '100%', display: 'block' }} />
            </TextBox>
          </PositionWrapper>
          <PositionWrapper $top="202px">
            <TextBox
              paddingType="wide"
              fontSize="2rem"
              fontWeight={600}
              rotate={-15}
              width="500px"
            >
              {visitorGuideData.description}
            </TextBox>
          </PositionWrapper>
        </InfoContent>
        <SchoolMap>
          <img src={schooMap} style={{ height: '100%' }} />
        </SchoolMap>
        {/* {visitorGuideData.buildings.map((name, idx) => {
          const layout = BUILDING_LAYOUTS[idx];
          return (
            <BuildingContainer
              key={idx}
              $top={layout.pos.top}
              //   $bottom={layout.pos.bottom}
              //   $left={layout.pos.left}
              $right={layout.pos.right}
            >
              <PositionWrapper
                $top={layout.labelPos.top}
                //   $bottom={layout.pos.bottom}
                //   $left={layout.pos.left}
                $right={layout.labelPos.right}
              >
                <TextBox paddingType="narrow" fontSize="2rem">
                  {name}
                </TextBox>
              </PositionWrapper>
              <BuildingImage src={layout.image} alt={`${name} 지도`} />
            </BuildingContainer>
          );
        })} */}
      </GuideContent>

      {/* 오른쪽 단 */}
      <RightColumn>
        {visitorGuideData.buildingLists.map((group, idx) => {
          const isActivated = activeIndices.includes(idx); // 💡 현재 활성화된 상태인지 확인
          const layout = BUILDING_LAYOUTS[idx];

          return (
            <BuildingRow key={idx}>
              <MapBox
                onMouseEnter={() => handleToggle(idx)}
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
                <TextBox fontSize="2.5rem" paddingType="narrow">
                  {group.building}
                </TextBox>
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

      {/* 모달창 */}
      {/* {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <MapModal onClick={(e) => e.stopPropagation()}>
            {' '}
            <CloseButton onClick={() => setIsModalOpen(false)}>X</CloseButton>
            <FullMapImage src={schooMap} alt="전체 학교 지도" />
          </MapModal>
        </ModalOverlay>
      )} */}
    </SectionContainer>
  );
};

export default VisitorGuideSection;
