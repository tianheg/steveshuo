import fs from 'fs'

;(async function () {
  try {
    const res = await fetch('http://steveshuo.com/json')
    const data = await res.json()
    fs.writeFileSync('static/data.json', JSON.stringify(data, null, 2))
    console.log('data.json saved')
  } catch (err) {
    console.error(err)
  }
})()
