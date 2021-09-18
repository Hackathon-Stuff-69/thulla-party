import axios from 'axios';

const baseURL = 'https://deckofcardsapi.com/api/deck';

const shuffleCards = async () => {
  return await axios
    .get(baseURL + '/new/shuffle/?deck_count=1')
    .then((res) => {
      console.log(res);
      return { result: res.data };
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

const drawCards = async (deckId: string, count: number) => {
  return await axios
    .get(baseURL + `/${deckId}/draw?count=${count}`)
    .then((res) => {
      console.log(res);
      return { result: res.data };
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

//testing

const addToPiles = async (deckId: string, pileId: string, cardArray: Array<any>) => {
  const cardStrArray = cardArray.map((value, index) => value.code);
  const cardString = cardStrArray.join(',');

  return await axios
    .get(baseURL + `/${deckId}/pile/${pileId}/add/?cards=${cardString}`)
    .then((res) => {
      console.log(res);
      return { result: res.data };
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

const drawFromPile = async (deckId: string, pileId: string, cardArray: Array<any>) => {
  const cardStrArray = cardArray.map((value, index) => value.code);
  const cardString = cardStrArray.join(',');

  return await axios
    .get(baseURL + `/${deckId}/pile/${pileId}/draw/?cards=${cardString}`)
    .then((res) => {
      console.log(res);
      return { result: res.data };
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

const drawNoFromPile = async (deckId: string, pileId: string, cardCount: number) => {
  return await axios
    .get(baseURL + `/${deckId}/pile/${pileId}/draw/?count=${cardCount}`)
    .then((res) => {
      console.log(res);
      return { result: res.data };
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

const listPiles = async (deckId: string, pileId: string) => {
  return await axios
    .get(baseURL + `/${deckId}/pile/${pileId}/list`)
    .then((res) => {
      console.log(res);
      return { result: res.data };
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export { shuffleCards, drawCards, addToPiles, drawFromPile, listPiles, drawNoFromPile };
