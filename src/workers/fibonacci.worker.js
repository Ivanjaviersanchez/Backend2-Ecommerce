process.on("message", (n) => {

  function fibonacci(num) {
    if (num <= 1) return num;

    return fibonacci(num - 1) + fibonacci(num - 2);
  }

  const result = fibonacci(n);

  process.send({
    result,
    pid: process.pid
  });

});