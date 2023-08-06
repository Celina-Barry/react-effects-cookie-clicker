import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useInterval from "../hooks/use-interval";
import Item from "./Item";
import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
 
  const [numCookies, setNumCookies] = useState(100);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });
  const [cookiesPerTick, setCookiesPerTick] = useState(0);

  const handleClickCookie = () => {
    setNumCookies((prevNumCookies) => prevNumCookies + 1);
  };

  const handleClickItem = (item) => {
    if (numCookies >= item.cost) {
      setNumCookies((prevNumCookies) => prevNumCookies - item.cost);
      setPurchasedItems((prevPurchasedItems) => ({
        ...prevPurchasedItems,
        [item.id]: prevPurchasedItems[item.id] + 1,
      }));
    } else {
      window.alert(`You can't afford a ${item.name}`);
    }
  };

  useInterval(() => {
    let cookiesPerTick = 0;
    for (const itemData of items) {
      console.log("item.value:", itemData.value);
      console.log("item.numOwned:", purchasedItems[itemData.id]);
      cookiesPerTick += itemData.value * purchasedItems[itemData.id];
    }
    //console.log("cookiesPerTick:", cookiesPerTick);

    const numOfGeneratedCookies = cookiesPerTick;
    //console.log("numOfGeneratedCookies:", numOfGeneratedCookies);

    setNumCookies((prevNumCookies) => prevNumCookies + numOfGeneratedCookies);
    setCookiesPerTick(numOfGeneratedCookies);
  }, 1000);
  useEffect (() => {
    document.title = `${numCookies} cookies - Cookie Clicker Workshop`;
    const handleSpaceKey = (ev) => {
      if (ev.code === "Space") {
        handleClickCookie()
      }
    };
      document.addEventListener("keydown", handleSpaceKey)
    return() => {
      document.title = `Cookie Clicker Workshop`
      document.removeEventListener('keydown', handleSpaceKey)

    }
  }, [numCookies]);


  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <BoldSpan>{cookiesPerTick}</BoldSpan> cookies per second
        </Indicator>
        <Button onClick={handleClickCookie}> 
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {/* TODO: Add <Item> instances here, 1 for each item type. */}
        {items.map((item) => (
          <Item key={item.id}
                name={item.name}
                cost={item.cost}
                value={item.value}
                numOwned={purchasedItems[item.id]}
                onClick={ () => handleClickItem(item)} />
        ))}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const BoldSpan = styled.span`
    font-weight: bold;
`

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
