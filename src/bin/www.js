//서버를 띄워주는 코드
"use strict";

const PORT = 3000;
const app = require("../app");

app.listen(PORT, () => {
    console.log("서버 시작..");
});

