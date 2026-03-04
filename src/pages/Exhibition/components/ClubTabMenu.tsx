import { Fragment } from 'react';
import styled from 'styled-components';
import { exhibitionData } from '../data/ExhibitionData';

const NavContainer = styled.nav`
  display: flex;
  justify-content: right;
  margin-top: 20px;
  margin-bottom: 60px;
  font-weight: 800;
  font-size: 2rem;
  z-index: 2000;
`;

const TabItem = styled.span<{ $isActive: boolean }>`
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? '#fff' : '#000')};
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`;

const Dot = styled.span`
  margin: 0 5px;
  color: #000;
`;

interface ClubTabMenuProps {
  activeClub: string;
  onSelectClub: (clubId: string) => void;
}

const ClubTabMenu = ({ activeClub, onSelectClub }: ClubTabMenuProps) => {
  return (
    <NavContainer>
      {exhibitionData.map((club, index) => (
        <Fragment key={club.id}>
          <TabItem
            $isActive={activeClub === club.id}
            onClick={() => onSelectClub(club.id)}
          >
            {club.name}
          </TabItem>
          {index < exhibitionData.length - 1 && <Dot>•</Dot>}
        </Fragment>
      ))}
    </NavContainer>
  );
};

export default ClubTabMenu;
