import styled from 'styled-components';
import { goodsData } from '../../data/goodsData';
import { AboutSection } from '../AboutSection';
import SectionTitle from '../SectionTitle';
import TextBox from '../../../../components/common/TextBox';

import goodsImg from '../../assets/goods.gif';

const GoodsContainer = styled(AboutSection)``;

const GoodsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const GoodsItem = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  width: 100%;
  min-height: 8rem;
  padding-top: 10px;
  border-top: 2px solid #000;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-weight: 800;
`;

const ItemName = styled.span`
  display: flex;
  flex-direction: row;
  gap: 6px;
`;

const ItemEngName = styled.span`
  font-size: 2.5rem;
`;

const ItemKorName = styled.span`
  margin-top: 5px;
  font-size: 1.2rem;
`;

const ItemPrice = styled.span`
  font-size: 2.5rem;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 1/1.2;
`;

const GoodsSectionMobile = () => {
  return (
    <GoodsContainer>
      <SectionTitle title={goodsData.title} subTitle={goodsData.subTitle} />
      <GoodsList>
        {goodsData.items.map((item) => (
          <GoodsItem key={item.id}>
            <TextBox textAlign="center" fontSize="2rem" paddingType="narrow">
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
      <ImagePlaceholder>
        {' '}
        <img src={goodsImg} style={{ height: '100%' }} />
      </ImagePlaceholder>
    </GoodsContainer>
  );
};

export default GoodsSectionMobile;
