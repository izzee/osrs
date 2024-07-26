import './App.css';
import { useEffect, useState } from 'react';
import ItemRow from './components/ItemRow';


function App() {
  const [prices, setPrices] = useState({})
  const [items, setItems] = useState([])
  const [pageIndex, setPageIndex] = useState(0)
  const itemsPerPage = 20
  const maxPages = Math.ceil((items.length - itemsPerPage) / itemsPerPage)

  const fetchMetadata = () => { 
    fetch('https://prices.runescape.wiki/api/v1/osrs/mapping', {method: 'GET'})
      .then(response => response.json())
      .then(response => {setItems(response)})
  }
  const fetchPrices = () => {
    fetch('https://prices.runescape.wiki/api/v1/osrs/1h', {method: 'GET'})
      .then(response => response.json())
      .then(response => setPrices(response.data))
  }
  useEffect(() => {
    fetchMetadata()
    fetchPrices()
  }, [])

  const updatePageIndex = (direction) => {
    const newPageIndex = Math.min(Math.max(pageIndex + direction,0), maxPages)
    setPageIndex(newPageIndex)
  }

  const currentItemsPage = () => {
    return items.slice(pageIndex * itemsPerPage, pageIndex * itemsPerPage + itemsPerPage)
  }
    
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Avg. Low Price</th>
            <th>Avg. High Price</th>
          </tr>
        </thead>
        <tbody> 
          {currentItemsPage().map((item, index) => {
            return (
              <ItemRow key={index} itemData={item} itemPriceInfo={prices[item.id]}/>
            )
          })}
        </tbody> 
      </table>
      <div className="controls">
        <button 
          onClick={() => updatePageIndex(-1)}
          disabled={pageIndex === 0}
        >
          -
        </button>
        <p>Page {pageIndex + 1} of {maxPages + 1}</p>
        <button 
          onClick={() => updatePageIndex(1)}
          disabled={pageIndex === maxPages}
        >
          +
        </button>
      </div>  
    </div>
  );
}

export default App;
