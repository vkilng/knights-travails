const Queue = () => {
  let queue = [];

  const enqueue = (...args) => {
    args.forEach(num => { queue = [num].concat(queue) });
    return;
  }

  const dequeue = () => {
    return queue.pop();
  }

  const print = () => console.log(queue);
  const toString = () => {
    let res = '';
    queue.forEach(num => res = res.concat(`(${num})->`));
    return res.slice(0, -2);
  };
  const size = () => queue.length;

  return { enqueue, dequeue, print, toString, size };
}

export default Queue;