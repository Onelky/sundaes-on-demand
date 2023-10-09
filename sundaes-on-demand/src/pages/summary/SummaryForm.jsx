import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import PropTypes from 'prop-types'

const popover = (
  <Popover>
    <Popover.Body>Nothing will be delivered</Popover.Body>
  </Popover>
)

const SummaryForm = ({ onConfirmClick }) => {
  const [checked, setChecked] = useState(false)
  const handleClick = () => setChecked(!checked)

  return (
    <div>
      <Form>
        <Form.Check id={'agree-to-terms'} type="checkbox">
          <Form.Check.Input type={'checkbox'} onChange={handleClick} checked={checked} />
          <Form.Check.Label>
            I agree to
            <OverlayTrigger placement={'right'} overlay={popover}>
              <span style={{ color: 'blue' }}>Terms and Conditions</span>
            </OverlayTrigger>
          </Form.Check.Label>
        </Form.Check>
      </Form>
      <Button disabled={!checked} onClick={onConfirmClick}>
        Confirm order
      </Button>
    </div>
  )
}

SummaryForm.propTypes = {
  onConfirmClick: PropTypes.func,
}

export default SummaryForm
