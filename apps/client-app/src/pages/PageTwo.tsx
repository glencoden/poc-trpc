import React from 'react'
import { Consumer } from '../components/Consumer'
import { Input } from '../components/Input'

const INPUT_ID = 'hello1234'

export const PageTwo: React.FC = () => {
    return (
        <>
            <Input inputId={INPUT_ID} />
            <Consumer inputId={INPUT_ID} />
        </>
    )
}
