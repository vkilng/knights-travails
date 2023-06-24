import { ReactComponent as Horsey } from '../assets/horse.svg';


export default function Square({ coordinate: [x, y], horsey = false, getPathsFrom }) {
  const isEven = (num) => {
    if (num % 2 === 0) return true;
    return false;
  }

  return (
    [(isEven(x) === isEven(y)) ?
      <button id={`${x}${y}`} onClick={horsey ? null : () => getPathsFrom([x, y])} key={`button${[x, y]}`}
        className="w-12 md:w-16 h-12 md:h-16 bg-black active:shadow-[inset_0_0_5px_#94a3b8] btn rounded-none items-center justify-center">
        {horsey ? <Horsey className='scale-150 -translate-y-2 md:translate-y-0' /> : null}
      </button>
      :
      <button id={`${x}${y}`} onClick={horsey ? null : () => getPathsFrom([x, y])} key={`button${[x, y]}`}
        className="w-12 md:w-16 h-12 md:h-16 bg-white hover:bg-stone-300 btn rounded-none items-center justify-center">
        {horsey ? <Horsey className='scale-150 -translate-y-2 md:translate-y-0' /> : null}
      </button>

    ]
  )
}