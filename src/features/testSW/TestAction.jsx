import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './TestConstans'

export const incrementConuter = () => {
    return {
        type:INCREMENT_COUNTER
    }
}

export const decrementConuter = () => {
    return {
        type:DECREMENT_COUNTER
    }
}