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
  bubbleSort: `export function* bubbleSort(
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
}`,
  mergeSort: mergeSort.toString(),
  // TODO: Waddu heck!?, perhaps use another third party snippet library?
  quickSort: `export function* quickSort(
  arr: number[],
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
  insertionSort: `export function* insertionSort(
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
}`,
  selectionSort: selectionSort.toString(),
  heapSort: heapSort.toString(),
  shellSort: shellSort.toString(),
  countingSort: countingSort.toString(),
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

export function* mergeSort(arr: number[]): Generator<number[]> {
  const n = arr.length;

  if (n > 1) {
    const mid = Math.floor(n / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    yield* mergeSort(left); // Sort left half
    yield* mergeSort(right); // Sort right half

    // Merge the sorted halves
    let i = 0,
      j = 0,
      k = 0;
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }
      yield [...arr];
    }

    while (i < left.length) {
      arr[k++] = left[i++];
      yield [...arr];
    }

    while (j < right.length) {
      arr[k++] = right[j++];
      yield [...arr];
    }
  }
  yield arr; // yield the final sorted array
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

// Selection Sort
export function* selectionSort(arr: number[]): Generator<number[]> {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
      yield [...arr]; // Yield after each comparison
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      yield [...arr]; // Yield after the swap
    }
  }
}

// Heap Sort
export function* heapSort(arr: number[]): Generator<number[]> {
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, n, i);
  }

  // One by one extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]; // Swap
    yield [...arr];
    yield* heapify(arr, i, 0);
  }

  yield arr;
}

function* heapify(arr: number[], n: number, i: number): Generator<number[]> {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    yield [...arr];
    yield* heapify(arr, n, largest);
  }
}

// Shell Sort
export function* shellSort(arr: number[]): Generator<number[]> {
  for (
    let gap = Math.floor(arr.length / 2);
    gap > 0;
    gap = Math.floor(gap / 2)
  ) {
    for (let i = gap; i < arr.length; i += 1) {
      const temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
        yield [...arr];
      }
      arr[j] = temp;
      yield [...arr];
    }
  }
}

// Counting Sort
export function* countingSort(arr: number[]): Generator<number[]> {
  const max = Math.max(...arr);
  const count = Array(max + 1).fill(0);
  const output = Array(arr.length).fill(0);

  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
  }

  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
    yield [...output];
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
  yield [...arr];
}
