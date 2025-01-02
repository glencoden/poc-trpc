import React from 'react'
import { Consumer } from '../components/Consumer'
import { Input } from '../components/Input'

const INPUT_ID = 'asdf1234'

export const PageOne: React.FC = () => {
    return (
        <>
            <Input inputId={INPUT_ID} />
            <Consumer inputId={INPUT_ID} />
        </>
    )
}
