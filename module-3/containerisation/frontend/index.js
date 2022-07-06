const axios = require('axios')

async function randomise () {
  const res = await axios.get('http://localhost:5000/random')
  const txt = res.data
  document.getElementById('msg').innerText = txt.toUpperCase()
}

window.addEventListener('load', () => {
  const btn = document.getElementById('btn')
  btn.addEventListener('click', randomise)
})
