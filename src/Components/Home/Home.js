import React from 'react'
import Hero_Section from '../Hero_Section/Hero_Section'
import "./Style.css"

export default function Home() {
  return (
    <div>
        <div className='hearder'>
            <h2 data-testid="service-text">Service Providers</h2>
            <hr></hr>
        </div>
        <div>
          <Hero_Section />
        </div>
    </div>
  )
}
