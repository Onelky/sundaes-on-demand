import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import { Col } from 'react-bootstrap'
import { BACKEND_BASE_URL } from '../../mocks/handlers'
import { TOPPINGS } from '../../constants'
import useOrderDetails from '../../contexts/OrderDetails'

const ToppingOption = ({ item }) => {
  const { name, imagePath, count } = item
  const { updateItemCount } = useOrderDetails()

  const handleChange = ({ target }) => {
    updateItemCount(item.name, target.checked ? 1 : 0, TOPPINGS)
  }

  return (
    <Col xs={12} lg={3}>
      <img src={BACKEND_BASE_URL + imagePath} alt={name + ' topping'} />

      <Form.Group controlId={`${name}-count`}>
        <Form.Label>{name}</Form.Label>
        <Form.Check value={!!count} onChange={handleChange} />
      </Form.Group>
    </Col>
  )
}

ToppingOption.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    imagePath: PropTypes.string,
    count: PropTypes.number,
  }),
}

export default ToppingOption
