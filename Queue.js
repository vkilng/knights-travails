const Queue = () => {
    let queue = [];

    const enqueue = (...args) => {
        args.forEach(num => queue.push(num));
        return;
    }

    const dequeue = () => {
        const temp = queue[0];
        queue = queue.slice(1);
        return temp;
    }

    const print = () => console.log(queue);
    const size = () => queue.length;
    
    return {enqueue, dequeue, print, size};
}

export {Queue};