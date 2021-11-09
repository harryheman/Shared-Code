const parseCsv = (csvStr) => {
  const arr = csvStr.split('\n')
  const headers = arr.splice(0, 1)[0].split(',')
  const rows = arr.map((item) =>
    item.split(',').reduce((a, c, i) => {
      a[headers[i]] = c
      return a
    }, {})
  )
  return { headers, rows }
}

export const fetchCsv = async (url) => {
  try {
    const response = await fetch(url)
    if (response.ok) {
      const csvStr = await response.text()
      const csvData = parseCsv(csvStr)
      // console.log(csvData.rows[0])
      return csvData
    }
  } catch (e) {
    console.error(e)
  }
}

export const getRandomColor = () =>
  `#${((Math.random() * 0xffffff) << 0).toString(16)}`
