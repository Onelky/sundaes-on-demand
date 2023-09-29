import React from 'react'
import PropTypes from 'prop-types'
import { BASE_URL } from './Options.jsx'

const ScoopOption = ({ item }) => {
  return (
    <>
      <img src={BASE_URL + item.imagePath} alt={item.name + ' scoop'} />
      {item.name}
      <input type={'number'} />
    </>
  )
}

ScoopOption.propTypes = {
  item: PropTypes.shape({ name: PropTypes.string, imagePath: PropTypes.string }),
}

export default ScoopOption
