const http = require("http");
const url = "http://10.1.1.209:4000/api/online/86197511851";
// const url = "http://127.0.0.1:4000/api/online/291214500940";
let count = 1;
function fetchUrl() {
  http.get(url, (res) => {
    res.setEncoding("utf8");
    let body = "end";
    res.on("data", (data) => {
      body += data;
    });
    res.on("end", () => {
      // body = JSON.parse(body);
      console.log(body);
      return body;
    });
    count += 1;
  });
}

(async () => {
  // @ts-ignore
  let interval = setInterval(fetchUrl, 2000);
  if (count === 10000) {
    console.log(interval);
    clearInterval(interval);
  }
})();
