let all = require("./all.js");
let except = require("./except.js");
let match = require("./match.js")

// Filter ra các data match ( có cả ở BC lẫn BE)
all = all.filter(item => match.includes(item.dataCid))

// Filter ra các data đã được sửa (có version = 2) ở BE
all = all.filter(item => !except.includes(item.dataCid))
console.log(all?.length)

// Filter sửa lại status
//  CANBUY => tradingStatus: 10
// GRANT => tradingStatus:30

all = all.map(item => ({
  ...item,
  tradingStatus: item.status === "CANBUY" ? 10: 30,
  displayCId: item.dataCid
}))


all = all.map(item => ({
  id: item.dataCid,
  displayCId: item.dataCid,
  tradingStatus: item.tradingStatus,
  owner: item.owner,
  buyer: item.tradingStatus === 30 ? item.buyer : null
}))



