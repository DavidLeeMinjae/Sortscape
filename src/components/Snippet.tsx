import React from 'react'

import CodeBlock from './ui/CodeBlock';
import { useSortingContext } from '@/context/sortingcontext';
import { sortingAlgorithmsStringRecord } from '@/utils/sortingAlgorithms';

const Snippet = ({...props}) => {
  const {
    selectedAlgorithm,
  } = useSortingContext();

  return (
    <div className='w-[90vw] mb-8'>
      {selectedAlgorithm && ( 
        <CodeBlock code={sortingAlgorithmsStringRecord[selectedAlgorithm]}  />
      )}
    </div>
  )
}

export default Snippet