import React from 'react'
import PropTypes from 'prop-types'
import { BACKEND_BASE_URL } from '../../mocks/handlers'
import { TOPPINGS } from '../../constants'
import useOrderDetails from '../../contexts/OrderDetails'

const ToppingOption = ({ item }) => {
  const { updateItemCount } = useOrderDetails()

  const handleChange = ({ target: { value } }) => {
    updateItemCount(item.name, value, TOPPINGS)
  }
  return (
    <>
      <img src={BACKEND_BASE_URL + item.imagePath} alt={item.name + ' topping'} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input type={'checkbox'} onChange={handleChange} />
        {item.name}
      </div>
    </>
  )
}

ToppingOption.propTypes = {
  item: PropTypes.shape({ name: PropTypes.string, imagePath: PropTypes.string }),
}

export default ToppingOption
