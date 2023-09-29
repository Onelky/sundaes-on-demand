import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

const popover = (
  <Popover>
    <Popover.Body>Nothing will be delivered</Popover.Body>
  </Popover>
)

const SummaryForm = () => {
  const [checked, setChecked] = useState(false)
  const handleClick = () => setChecked(!checked)

  return (
    <div>
      <Form>
        <Form.Check id={'agree-to-terms'} type="checkbox">
          <Form.Check.Input type={'checkbox'} onClick={handleClick} checked={checked} />
          <Form.Check.Label>
            I agree to
            <OverlayTrigger trigger={'hover'} placement={'right'} overlay={popover}>
              <span style={{ color: 'blue' }}>Terms and Conditions</span>
            </OverlayTrigger>
          </Form.Check.Label>
        </Form.Check>
      </Form>
      <Button disabled={!checked}>Confirm order</Button>
    </div>
  )
}

export default SummaryForm
