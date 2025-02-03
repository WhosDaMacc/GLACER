// services/api/index.js
const express = require('express')
const app = express()

// Calculate profit distribution
app.get('/profit', (req, res) => {
  const totalProfit = 100000 // Replace with real calculation
  const userShare = totalProfit * 0.2 // 20% distribution
  res.json({ distributable: userShare })
})

app.listen(3000, () => console.log('API running on port 3000'))