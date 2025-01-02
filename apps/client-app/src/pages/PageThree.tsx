import React from 'react'
import { Input } from '../components/Input'

const INPUT_ID = 'favorite-day-of-week'

export const PageThree: React.FC = () => {
    return (
        <div className='page-container'>
            <Input inputId={INPUT_ID} />
        </div>
    )
}
