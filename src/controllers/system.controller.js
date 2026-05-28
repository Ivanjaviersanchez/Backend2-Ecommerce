import { fork } from "child_process";

// BLOQUEANTE
export const blockingTask = (req, res) => {

  const start = Date.now();

  function fibonacci(n) {
    if (n <= 1) return n;

    return fibonacci(n - 1) + fibonacci(n - 2);
  }

  const result = fibonacci(40);

  const end = Date.now();

  res.json({
    type: "blocking",
    result,
    pid: process.pid,
    time: `${end - start}ms`
  });
};

// DELEGADA
export const delegatedTask = (req, res) => {

  const start = Date.now();

  const child = fork(
    "./src/workers/fibonacci.worker.js"
  );

  child.send(40);

  child.on("message", (data) => {

    const end = Date.now();

    res.json({
      type: "delegated",
      result: data.result,
      parentPID: process.pid,
      childPID: data.pid,
      time: `${end - start}ms`
    });

  });

};