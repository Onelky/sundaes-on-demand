import React from 'react'
import PropTypes from 'prop-types'
import { BACKEND_BASE_URL } from '../../mocks/handlers'
import useOrderDetails from '../../contexts/OrderDetails'
import { SCOOPS } from '../../constants'
import { Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

const ScoopOption = ({ item }) => {
  const { name, amount, imagePath } = item
  const { updateItemCount } = useOrderDetails()
  const handleChange = ({ target: { value } }) => {
    updateItemCount(name, parseInt(value), SCOOPS)
  }
  return (
    <Col xs={12} lg={3}>
      <img src={BACKEND_BASE_URL + imagePath} alt={name + ' scoop'} />
      <Form.Group controlId={`${name}-count`}>
        <Form.Label>{name}</Form.Label>
        <Form.Control type={'number'} defaultValue={0} value={amount} onChange={handleChange} />
      </Form.Group>

      {/*<input type={'number'} value={amount} onChange={handleChange} />*/}
    </Col>
  )
}

ScoopOption.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    imagePath: PropTypes.string,
    amount: PropTypes.number,
  }),
}

export default ScoopOption
