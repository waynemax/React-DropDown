import React, {Component} from 'react'
import DropDown from '../../components/DropDown'

import './assets/index.css'

const response = {
  items: [
    {
      id: 1,
      name: 'Bitcoin',
      price: 9524.73,
      volatility: '0.89%',
      photo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png'
    },
    {
      id: 2,
      name: 'Ripple',
      price: 0.31,
      volatility: '-0.32%',
      photo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
    },
    {
      id: 3,
      name: 'Ethereum',
      price: 208.45,
      volatility: '0.50%',
      photo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    },
    {
      id: 4,
      name: 'Litecoin',
      price: 89.28,
      volatility: '0.79%',
      photo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2.png',
    },
    {
      id: 5,
      name: 'Bitcoin Cash / BCC',
      price: 306.18,
      volatility: '1.36%',
      photo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png',
    },
    {
      id: 6,
      name: 'EOS',
      price: 4.30,
      volatility: '1.53%',
      photo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1765.png',
    },
    {
      id: 7,
      name: 'Binance Coin',
      price: 27.61,
      volatility: '-0.41%',
      photo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    },
    {
      id: 8,
      name: 'Tether',
      price: 1.00,
      volatility: '-0.08%',
      photo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    },
    {
      id: 9,
      name: 'IOTA',
      price: 0.282595,
      volatility: '-1,77%',
      photo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1720.png',
    },
    {
      id: 10,
      name: 'ChainLink',
      price: 2.23,
      volatility: '-0.98%',
      photo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png',
    }
  ]
};

class index extends Component {
  get items() {
    return response.items.slice();
  }

  render() {
    return <div className="App--MainPage_first_box">
      <DropDown
        items={this.items}
        withoutPhoto={false}
        placeholder="Поиск валюты..."
        addButtonText="Добавить"
        maxResultHeight={400}
        onChangeCallback={(data) => {
            console.log(data);
          }
        }
      />
      <div style={{width: 400, height: 500 + 'px'}}></div>
      <DropDown
        items={this.items}
        withoutPhoto={true}
        placeholder="Поиск..."
        addButtonText="Add"
      />
    </div>
  }
}

export default index;