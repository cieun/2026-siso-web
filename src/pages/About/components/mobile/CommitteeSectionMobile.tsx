import styled from 'styled-components';
import { committeeData } from '../../data/committeeData';
import Footer from '../../../../components/common/Footer';

const CommitteeContainer = styled.section`
  width: 100%;
  height: 100vh;
  padding: 0px 24px 0 24px;
  box-sizing: border-box;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  background: transparent;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
`;

const SubTitleGroup = styled.div`
  margin-bottom: 30px;
`;

const EngSub = styled.h3`
  font-size: 3.2rem;
  font-weight: 800;
  margin: 0;
`;

const KorSub = styled.p`
  font-weight: 800;
`;

const LogoGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px 50px;
  flex-wrap: wrap;

  margin-top: 20px;
`;

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
`;

const StaffList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StaffItem = styled.div`
  display: flex;
  gap: 20px;
  font-size: 1.8rem;
  font-weight: 800;
`;

const Role = styled.span`
  width: 100px; /* 역할 이름 폭 고정 */
  color: #000;
`;

const Names = styled.span`
  color: #000;
  word-break: keep-all;
  font-weight: 600;
`;

const CommitteeSectionMobile = () => {
  const { staffInfo, clubInfo } = committeeData;

  return (
    <CommitteeContainer>
      <ContentWrapper>
        <Column>
          <SubTitleGroup>
            <EngSub>HIVCD 9 CLUBS</EngSub>
            <KorSub>참여 소모임</KorSub>
          </SubTitleGroup>
          <LogoGrid>
            {clubInfo.map((club, idx) => (
              <LogoBox key={idx}>
                <img src={club.logo} alt={club.name} />
              </LogoBox>
            ))}
          </LogoGrid>
        </Column>

        <Column>
          <SubTitleGroup>
            <EngSub>Committee</EngSub>
            <KorSub>운영진</KorSub>
          </SubTitleGroup>
          <StaffList>
            {staffInfo.map((item, idx) => (
              <StaffItem key={idx}>
                <Role>{item.role}</Role>
                <Names>{item.members.join(' ')}</Names>
              </StaffItem>
            ))}
          </StaffList>
        </Column>
      </ContentWrapper>
      <Footer />
    </CommitteeContainer>
  );
};

export default CommitteeSectionMobile;
