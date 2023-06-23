import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as Horsey } from '../assets/horse.svg';


export default function Square({ coordinate: [x, y], horsey = false, getPathsFrom }) {
  const isEven = (num) => {
    if (num % 2 === 0) return true;
    return false;
  }

  return (
    [(isEven(x) === isEven(y)) ?
      <button id={`${x}${y}`} onClick={horsey ? null : () => getPathsFrom([x, y])} key={uuidv4()}
        className="w-16 h-16 bg-black active:shadow-[inset_0_0_5px_#94a3b8] btn rounded-none items-center justify-center">
        {horsey ? <Horsey /> : null}
      </button>
      :
      <button id={`${x}${y}`} onClick={horsey ? null : () => getPathsFrom([x, y])} key={uuidv4()}
        className="w-16 h-16 bg-white hover:bg-stone-300 btn rounded-none items-center justify-center">
        {horsey ? <Horsey /> : null}
      </button>

    ]
  )
}