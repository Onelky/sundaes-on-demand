import React from 'react'
import PropTypes from 'prop-types'
import { BACKEND_BASE_URL } from '../../mocks/handlers'

const ToppingOption = ({ item }) => {
  return (
    <>
      <img src={BACKEND_BASE_URL + item.imagePath} alt={item.name + ' topping'} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input type={'checkbox'} />
        {item.name}
      </div>
    </>
  )
}

ToppingOption.propTypes = {
  item: PropTypes.shape({ name: PropTypes.string, imagePath: PropTypes.string }),
}

export default ToppingOption
