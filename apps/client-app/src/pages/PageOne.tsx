import React from 'react'
import { Input } from '../components/Input'

const INPUT_ID = 'cool-developer-name'

export const PageOne: React.FC = () => {
    return (
        <div className='page-container'>
            <Input inputId={INPUT_ID} />
        </div>
    )
}
