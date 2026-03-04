import { Fragment } from 'react';
import styled, { useTheme } from 'styled-components';
import TextBox from '../../../../components/common/TextBox';

const GRID_CONFIG = {
  STEP: 6,
  UNIT: 'vh',
  LINE_WIDTH: 2,
  CONTAINER_HEIGHT: 70,
};

const getVal = (multiplier: number, offset = 0) =>
  `calc(${multiplier * GRID_CONFIG.STEP}${GRID_CONFIG.UNIT} + ${offset}px)`;

const generateGridLines = (excludedPoints: string[]) => {
  const excludedSet = new Set(excludedPoints);

  return [1, 2, 3, 4]
    .map((col) => {
      const lines = [0, 1, 2, 3, 4]
        .map((row) => {
          const start = `${row * GRID_CONFIG.STEP}${GRID_CONFIG.UNIT}`;
          const end = `calc(${start} + ${GRID_CONFIG.LINE_WIDTH}px)`;

          if (excludedSet.has(`${col}-${row}`)) {
            return `transparent ${start}, transparent ${end}`;
          }
          return `transparent ${start}, #000 ${start}, #000 ${end}, transparent ${end}`;
        })
        .join(', ');

      return `linear-gradient(to bottom, ${lines})`;
    })
    .join(', ');
};

const TableWrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 0 0 0 30px;
`;

const DayHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 10px;
  text-align: center;
  font-weight: 800;
  font-size: 1.4rem;
  line-height: 1.2;
`;

const GridContainer = styled.div`
  position: relative;
  width: 100%;
  height: 25vh;
  background-image: ${generateGridLines([
    '1-1',
    '1-2',
    '1-3',
    '2-1',
    '2-2',
    '2-3',
    '3-1',
    '3-2',
    '3-3',
    '4-1',
    '4-2',
    '4-3',
  ])};
  background-size:
    25% 100%,
    25% 100%,
    25.2% 100%,
    25% 100%;
  background-position:
    0 0,
    33.3% 0,
    66.6% 0,
    100% 0;
  background-repeat: no-repeat;
`;

const DottedLine = styled.div<{ $column: number }>`
  position: absolute;
  left: ${({ $column }) => `calc((${$column - 1} * (100% - 24%)) / 3)`};
  width: 24%;
  height: ${GRID_CONFIG.LINE_WIDTH}px;
  background-image: linear-gradient(to right, #000 2px, transparent 2px);
  background-size: 10px ${GRID_CONFIG.LINE_WIDTH}px;
  z-index: 0;
`;
const TimeLabel = styled.span<{ $topIdx: number }>`
  position: absolute;
  left: -35px;
  top: ${({ $topIdx }) => getVal($topIdx, -9)};
  font-weight: 800;
  font-size: 1.4rem;
`;

const TimeBlock = styled.div<{
  $color: string;
  $top: number;
  $height: number;
  $column: number;
  $isHalf?: boolean;
  $halfPos?: 'left' | 'right';
}>`
  position: absolute;
  top: ${({ $top }) => $top}vh;
  left: ${({ $column }) => `calc((${$column - 1} * (100% - 24.5%)) / 3)`};

  ${({ $isHalf, $halfPos }) =>
    $isHalf && $halfPos === 'right' && `margin-left: calc(12.6%);`}

  width: ${({ $isHalf }) =>
    $isHalf ? 'calc(12.5% - 8px)' : 'calc(25% - 8px)'};
  height: 11vh;

  background: ${({ $color }) =>
    `linear-gradient(140deg, ${$color} 0%, #fff 100%)`};
  box-shadow: 3px 3px 0px 3px ${({ $color }) => $color};

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

interface TimeTableProps {
  onSelectLecture: (id: number) => void;
}

interface TimeBlockData {
  id: number;
  name: string;
  color: string;
  top: number;
  height: number;
  col: number;
  $isHalf?: boolean;
  $halfPos?: 'left' | 'right';
}

const TimeTableMobile = ({ onSelectLecture }: TimeTableProps) => {
  const theme = useTheme();
  const excludedDots = new Set([
    '1-0',
    '1-1',
    '1-2',
    '1-3',
    '2-0',
    '2-1',
    '2-2',
    '2-3',
    '3-0',
    '3-1',
    '3-2',
    '3-3',
    '4-0',
    '4-1',
    '4-2',
    '4-3',
    '5-0',
    '5-1',
    '5-2',
    '5-3',
  ]);

  const timeBlocks: TimeBlockData[] = [
    {
      id: 1,
      name: 'HIPS',
      color: theme.colors.redShimmer,
      top: 0.2,
      height: 12,
      col: 1,
    },
    {
      id: 2,
      name: 'PROTO',
      color: theme.colors.solidPeach,
      top: 12.3,
      height: 12,
      col: 1,
    },
    {
      id: 3,
      name: 'HYPHEN',
      color: theme.colors.lasPalmas,
      top: 0.2,
      height: 12,
      col: 2,
    },
    {
      id: 4,
      name: 'Dromapic',
      color: theme.colors.lemony,
      top: 12.3,
      height: 12,
      col: 2,
    },
    {
      id: 5,
      name: 'I-Ray',
      color: theme.colors.sportyPink,
      top: 0.2,
      height: 12,
      col: 3,
    },
    {
      id: 6,
      name: 'ADrenalin',
      color: theme.colors.smoothPink,
      top: 12.3,
      height: 12,
      col: 3,
    },
    {
      id: 7,
      name: 'Greenbee',
      color: theme.colors.intenseAzure,
      top: 0.2,
      height: 12,
      col: 4,
      $isHalf: true,
      $halfPos: 'left',
    },
    {
      id: 8,
      name: 'Hangulggol',
      color: theme.colors.babyBlueEyes,
      top: 0.2,
      height: 12,
      col: 4,
      $isHalf: true,
      $halfPos: 'right',
    },
    {
      id: 9,
      name: 'YADZ',
      color: theme.colors.digitalYellow,
      top: 12.3,
      height: 12,
      col: 4,
    },
  ];

  return (
    <TableWrapper>
      <DayHeader>
        {['03.10 TUE', '03.11 WED', '03.12 THU', '03.13 FRI'].map((day) => {
          const [date, week] = day.split(' ');
          return (
            <div key={day}>
              {date}
              <br />
              {week}
            </div>
          );
        })}
      </DayHeader>

      <GridContainer>
        {['17:30', '18:30', '19:30', '20:30', '21:30'].map((time, i) => (
          <TimeLabel key={time} $topIdx={i}>
            {time}
          </TimeLabel>
        ))}

        {[0, 1, 2, 3].map((i) => (
          <Fragment key={i}>
            {[1, 2, 3, 4].map(
              (col) =>
                !excludedDots.has(`${col}-${i}`) && (
                  <DottedLine
                    key={`${i}-${col}`}
                    $column={col}
                    style={{
                      top: `calc(${i * GRID_CONFIG.STEP}${GRID_CONFIG.UNIT} + ${GRID_CONFIG.STEP / 2}${GRID_CONFIG.UNIT})`,
                    }}
                  />
                ),
            )}
          </Fragment>
        ))}
        {timeBlocks.map((block) => (
          <TimeBlock
            key={block.name}
            $color={block.color}
            $top={block.top}
            $height={block.height}
            $column={block.col}
            $isHalf={block.$isHalf}
            $halfPos={block.$halfPos}
            onClick={() => onSelectLecture(block.id)}
            style={{ cursor: 'pointer' }}
          >
            <TextBox
              fontSize="1.6rem"
              paddingType="narrow"
              textAlign="center"
              rotate={-8}
              width="100%"
            >
              {block.id}
            </TextBox>
          </TimeBlock>
        ))}
      </GridContainer>
    </TableWrapper>
  );
};

export default TimeTableMobile;
