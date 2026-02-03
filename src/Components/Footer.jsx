import Typography from 'antd/es/typography/Typography'
import React from 'react'

export default function Footer() {
  return (
    <div className='Footer'>
      <Typography.Link href="tel:+91 9352169668">+91 9352169668</Typography.Link>
      <Typography.Link href="http://www.google.com" target={'_blank'}>Privacy Policy</Typography.Link>
      <Typography.Link href="http://www.google.com" target={'_blank'}>Term of Use</Typography.Link>
    </div>
  )
}
