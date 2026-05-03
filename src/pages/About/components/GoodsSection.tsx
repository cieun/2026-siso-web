import styled from 'styled-components';
import { goodsData } from '../data/goodsData';
import { AboutSection } from './AboutSection';
import SectionTitle from './SectionTitle';
import TextBox from '../../../components/common/TextBox';

import goodsImg from '../assets/goods.gif';

const GoodsContainer = styled(AboutSection)``;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const GoodsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-right: 36px;
`;

const GoodsItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 11fr;
  height: 11rem;
  padding-top: 20px;
  border-top: 3px solid #000;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 2.2rem;
  font-weight: 800;
  color: #000;
`;

const ItemName = styled.span`
  display: flex;
`;

const ItemEngName = styled.span`
  margin-right: 6px;
  font-size: 2.8rem;
`;

const ItemKorName = styled.span`
  margin-top: 5px;
  font-size: 1.5rem;
`;

const ItemPrice = styled.span`
  font-size: 2.8rem;
`;

const ImagePlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
`;

const GoodsSection = () => {
  return (
    <GoodsContainer>
      <LeftContent>
        <SectionTitle title={goodsData.title} subTitle={goodsData.subTitle} />
        <GoodsList>
          {goodsData.items.map((item) => (
            <GoodsItem key={item.id}>
              <TextBox
                textAlign="center"
                fontSize="2.6rem"
                paddingType="narrow"
              >
                {item.id}
              </TextBox>
              <TextContent>
                <ItemName>
                  <ItemEngName>{item.eng}</ItemEngName>
                  <ItemKorName>{item.kor}</ItemKorName>
                </ItemName>
                <ItemPrice>{item.price}</ItemPrice>
              </TextContent>
            </GoodsItem>
          ))}
        </GoodsList>
      </LeftContent>

      <ImagePlaceholder>
        <img src={goodsImg} style={{ height: '100%' }} />
      </ImagePlaceholder>
    </GoodsContainer>
  );
};

export default GoodsSection;
