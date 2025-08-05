function main() {
  const data = [...new Array(250)].map(() => Math.random())
  console.log(JSON.stringify(data))
}

main()
