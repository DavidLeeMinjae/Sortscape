import React from 'react'

import CodeBlock from './ui/CodeBlock';
import { useSortingContext } from '@/context/sortingcontext';
import { sortingAlgorithmsStringRecord } from '@/utils/sortingAlgorithms';

const Snippet = ({...props}) => {
  const {
    selectedAlgorithm,
  } = useSortingContext();

  return (
    <div className='w-[90vw] 2xl:w-[35%]'>
      {selectedAlgorithm && ( 
        <CodeBlock code={sortingAlgorithmsStringRecord[selectedAlgorithm]}  />
      )}
    </div>
  )
}

export default Snippet