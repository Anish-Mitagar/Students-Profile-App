import React, { useEffect, useState } from 'react'

export const StudentsPagination = ( {setPageNumber} ) => {

    const [pageNum, setPageNum] = useState(0)

    const increment = () => {
        setPageNum(prevState => prevState + 1)
    }

    const decrement = () => {
        setPageNum(prevState => prevState > 0 ? prevState - 1 : prevState)
    }

    useEffect(() => {
        setPageNumber(pageNum)
    }, [pageNum])

    return (
        <div>
            <button type="button" onClick={decrement}>-</button>
            <input type='number' min = {0} value={pageNum} onChange={(e) => setPageNum(parseInt(e.target.value))}></input>
            <button type="button" onClick={increment}>+</button>
        </div>
    )
}
