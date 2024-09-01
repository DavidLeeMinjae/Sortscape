import { comparisonIndices } from "@/context/sortingcontext";

export function generateRandomArray(
  size: number,
  min = 5,
  max = 100
): number[] {
  const randomArray = [];
  for (let i = 0; i < size; i++) {
    randomArray.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return randomArray;
}

// String representation of each algorithm for use in templates (codeBlock snippets, etc.)
export const sortingAlgorithmsStringRecord: Record<string, string> = {
  bubbleSort: bubbleSort.toString(),
  //TODO: Pass this as a string(currently changing to machine code when passed as toString)
  quickSort: `arr: number[],
    setArray: React.Dispatch<React.SetStateAction<number[]>>,
    setComparisonIndices: React.Dispatch<React.SetStateAction<comparisonIndices>>,
    low: number = 0,
    high: number = arr.length - 1
  ): Generator<number[], void, undefined> {
  if (low < high) {
    const pivotIndex = yield* partition(arr, low, high, setArray, setComparisonIndices);
    yield* quickSort(arr, setArray, setComparisonIndices, low, pivotIndex - 1);
    yield* quickSort(arr, setArray, setComparisonIndices, pivotIndex + 1, high);
  }
    yield arr; // Yield the final sorted array
  }`,
  insertionSort: insertionSort.toString(),
};

export function* bubbleSort(
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparisonIndices: React.Dispatch<React.SetStateAction<comparisonIndices>>
): Generator<number[]> {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      setComparisonIndices({
        indicies: [j, j + 1],
      });
      if (arr[j] > arr[j + 1]) {
        setComparisonIndices({ indicies: [j], matchIndex: j + 1 });
        yield [];

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]); // Update the array in state after every swap
      }
      yield [];
    }
  }
  return arr; // Signal that the algorithm is finished
}

export function* quickSort(
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparisonIndices: React.Dispatch<React.SetStateAction<comparisonIndices>>,
  low: number = 0,
  high: number = arr.length - 1
): Generator<number[], void, undefined> {
  if (low < high) {
    const pivotIndex = yield* partition(
      arr,
      low,
      high,
      setArray,
      setComparisonIndices
    );
    yield* quickSort(arr, setArray, setComparisonIndices, low, pivotIndex - 1);
    yield* quickSort(arr, setArray, setComparisonIndices, pivotIndex + 1, high);
  }
  yield arr; // Yield the final sorted array
}
function* partition(
  arr: number[],
  low: number,
  high: number,
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparisonIndices: React.Dispatch<React.SetStateAction<comparisonIndices>>
): Generator<number[]> {
  const pivot = arr[high];
  // Generate the indices array using Array.from and a mapping function
  const indices = Array.from(
    { length: high - low + 1 },
    (_, index) => low + index
  );

  setComparisonIndices({ indicies: indices, matchIndex: high });
  let i = low - 1;

  for (let j = low; j < high; j++) {
    setComparisonIndices({
      indicies: indices,
      matchIndex: high,
      iteratorIndex: j,
      swapIndices: [i + 1],
    });
    yield [];
    if (arr[j] < pivot) {
      i++;
      if (arr[i] !== arr[j]) {
        setComparisonIndices({
          indicies: indices,
          matchIndex: high,
          swapIndices: [i, j],
        });
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        yield []; // Yield a copy of the array after each swap
      }
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  setArray([...arr]);
  yield []; // Yield after placing the pivot
  return i + 1;
}

// Insertion Sort
export function* insertionSort(
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparisonIndices: React.Dispatch<React.SetStateAction<comparisonIndices>>
): Generator<number[]> {
  for (let i = 1; i < arr.length; i++) {
    let currentVal = arr[i];
    let j = i - 1;
    setComparisonIndices({
      //Reset the comparison indicies through every iteration (and highlight the element being evaluated)
      indicies: [],
      transparentIndex: i,
    });

    while (j >= 0 && arr[j] > currentVal) {
      setComparisonIndices({ indicies: [i, j], transparentIndex: i }); //Highlight the elements being compared
      arr[j + 1] = arr[j];
      j--;
      yield []; // Yield after each comparison/shift
    }

    setComparisonIndices({ indicies: [i, j] }); //If there was no match, reset the transparency index as well as the matchIndex

    if (arr[j + 1] !== currentVal) {
      setComparisonIndices({
        indicies: [i, j],
        matchIndex: j + 1,
        transparentIndex: i,
      });

      yield []; //Yield after setting comparison indices (highlighting match green)
    }

    arr[j + 1] = currentVal;
    setArray([...arr]);
    setComparisonIndices({
      indicies: [],
      matchIndex: null,
      transparentIndex: null,
    });
    yield []; // Yield after the insertion
  }
}
