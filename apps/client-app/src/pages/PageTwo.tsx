import React from 'react'
import { Consumer } from '../components/Consumer'
import { Input } from '../components/Input'

const INPUT_ID = 'hottest-newbie-to-join-heyflow'

export const PageTwo: React.FC = () => {
    return (
        <div className='page-container'>
            <Input inputId={INPUT_ID} />
            <Consumer inputId={INPUT_ID} />
        </div>
    )
}
