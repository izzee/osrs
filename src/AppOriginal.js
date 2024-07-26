import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([])
  const [metadata, setMetadata] = useState([])

  const fetchPrices = async () => {
    fetch('https://prices.runescape.wiki/api/v1/osrs/1h', {method: 'GET'})
      .then(response => response.json())
      .then(response => setItems(Object.entries(response.data)))
  }

  const fetchMetadata = async () => { 
    fetch('https://prices.runescape.wiki/api/v1/osrs/mapping', {method: 'GET'})
      .then(response => response.json())
      .then(response => {

        setMetadata(response)
      })
  }

  useEffect(() => {
    fetchPrices()
    fetchMetadata()
  }, [])

  useEffect(() => {
    if (!metadata) {
      return
    }
    
  }, [items, metadata])

  console.log(metadata)

  const getItemInfo = (itemId) => {

    const itemInfo = metadata.find(itemData => itemData.id == itemId)
    return itemInfo
  }

  return (
    <div className="App">
      {
        items.map((item, index) => {
          return (
            <div key={index}>
              <p>Item id: {item[0]}</p>
              <p>Item name: {getItemInfo(item[0]).name}</p>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
