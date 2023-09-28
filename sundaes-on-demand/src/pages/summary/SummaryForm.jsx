import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SummaryForm = () => {
  const [checked, setChecked] = useState(false)
  const handleClick = () => setChecked(!checked)

  return (
    <div>
      <Form>
        <Form.Check
          id={'agree-to-terms'}
          type="checkbox"
          label="I agree to Terms and Conditions"
          onClick={handleClick}
          checked={checked}
        />
      </Form>
      <Button disabled={!checked}>Confirm order</Button>
    </div>
  )
}

export default SummaryForm
