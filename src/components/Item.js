
import styled from "styled-components";

const Item = ({ name, cost, value, numOwned, onClick }) => {

    console.log("numOwned:", numOwned);
    
    return (
        <ItemWrapper>
        <ItemName onClick={onClick}>{name}</ItemName>
        <ItemInfo>
          <p>Cost: {cost} cookies. Produces: {value} cookies per second. {numOwned}</p>
        </ItemInfo>
      </ItemWrapper>
    );
  };
  const ItemWrapper = styled.div`
  padding: 10px;
  margin: 10px;
`;

const ItemName = styled.button`
  font-size: 18px;
  margin-bottom: 5px;
  color: white;
  background-color: blue;
  border-radius: 5px;
  border-style: none;
  padding: 8%
`;

const ItemInfo = styled.div`
  font-size: 14px;
`;
export default Item;