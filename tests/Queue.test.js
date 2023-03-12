import { Queue } from "../Queue.js";

const queue = Queue();

test("toString()", () => {
    expect(queue.toString()).toBe("");
})

test("Checks if enqueue() enqueues passed numbers to the queue", () => {
    queue.enqueue(2, 3, -1);
    expect(queue.toString()).toBe("(-1)->(3)->(2)");
})

test("Check after dequeue a number from queue", () => {
    queue.dequeue();
    expect(queue.toString()).toBe("(-1)->(3)");
})

test("Checks for size of queue", () => {
    queue.enqueue(5, 4);
    expect(queue.toString()).toBe("(4)->(5)->(-1)->(3)");
    expect(queue.size()).toBe(4);
    queue.dequeue();
    expect(queue.toString()).toBe("(4)->(5)->(-1)");
    expect(queue.size()).toBe(3);
})