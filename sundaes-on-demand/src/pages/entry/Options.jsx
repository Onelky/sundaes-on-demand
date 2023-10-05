import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Alert from 'react-bootstrap/Alert'
import ScoopOption from './ScoopOption.jsx'
import ToppingOption from './ToppingOption'
import { BACKEND_BASE_URL } from '../../mocks/handlers'
import useOrderDetails from '../../contexts/OrderDetails'
import { pricePerItem, SCOOPS, TOPPINGS } from '../../constants'
import { formatCurrency } from '../../utils'

const Options = ({ optionType }) => {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const { totals, optionsCount } = useOrderDetails()

  useEffect(() => {
    axios
      .get(BACKEND_BASE_URL + optionType)
      .then((result) => setItems(result.data))
      .catch(({ response: { data } }) => setError(data.message))
  }, [optionType])

  const Item = optionType === SCOOPS ? ScoopOption : optionType === TOPPINGS ? ToppingOption : null
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

  return (
    <div>
      {error ? (
        <Alert>{error}</Alert>
      ) : (
        <>
          <h2>{title}</h2>
          <p>{formatCurrency(pricePerItem[optionType])} each</p>
          <p>
            {title} total: {formatCurrency(totals[optionType])}
          </p>
          {items.map((item) => (
            <div key={item.id ?? item.name} style={{ display: 'flex', flexDirection: 'column' }}>
              <Item
                key={item.name}
                item={{ ...item, count: optionsCount[optionType][item.name] ?? 0 }}
              />
            </div>
          ))}
        </>
      )}
    </div>
  )
}

Options.propTypes = {
  optionType: PropTypes.string,
}
export default Options
