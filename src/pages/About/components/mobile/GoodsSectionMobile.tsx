import styled from 'styled-components';
import { AboutSection } from '../AboutSection';
import TextBox from '../../../../components/common/TextBox';
import SectionTitle from '../SectionTitle';
import { goodsData } from '../../data/goodsData';

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
  border-top: 2px solid #000;
  padding-top: 10px;
  width: 100%;
  min-height: 8rem;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 800;
  width: 100%;
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
  font-size: 1.2rem;
  margin-top: 5px;
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
