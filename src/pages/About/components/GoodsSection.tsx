import styled from 'styled-components';
import { AboutSection } from './AboutSection';
import TextBox from '../../../components/common/TextBox';
import SectionTitle from './SectionTitle';
import { goodsData } from '../data/goodsData';

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
  border-top: 3px solid #000;
  padding-top: 20px;
  height: 11rem;
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
  font-size: 2.8rem;
  margin-right: 6px;
`;

const ItemKorName = styled.span`
  font-size: 1.5rem;
  margin-top: 5px;
`;

const ItemPrice = styled.span`
  font-size: 2.8rem;
`;

const ImagePlaceholder = styled.div`
  // background-color: #d9d9d9;
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
