import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import ScoopOption from './ScoopOption.jsx'
import { BACKEND_BASE_URL } from '../../mocks/handlers'

const Options = ({ optionType }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios
      .get(BACKEND_BASE_URL + optionType)
      .then((result) => setItems(result.data))
      .catch((e) => console.error(e))
  }, [optionType])

  // const Item = ({ item, optionType }) => {
  //   return (
  //     <>
  //       <img src={item.imagePath} alt={item.name + ' scoop'} />
  //       {optionType === 'toppings' && <input type={'checkbox'} />}
  //       {item.name}
  //       {optionType === 'scoops' && <input type={'number'} />}
  //     </>
  //   )
  // }

  const Item = optionType === 'scoops' ? ScoopOption : null

  return (
    <div>
      {items.map((item) => (
        <div key={item.id ?? item.name} style={{ display: 'flex', flexDirection: 'column' }}>
          <Item key={item.name} item={item} />
        </div>
      ))}
    </div>
  )
}

Options.propTypes = {
  optionType: PropTypes.string,
}
export default Options
