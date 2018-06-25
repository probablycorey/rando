const MUPPETS = ["Kermit", "Miss Piggy", "Fozzie", "Animal", "Scooter", "Skeeter", "Rowlf", "Gonzo", "Bunsen", "Beaker"]

exports.randomMuppet = (req, res) => {
  const muppet = MUPPETS[Math.floor(Math.random()*MUPPETS.length)]
  console.log(`Returned a muppet i think: ${muppet}`)
  res.send(muppet)
}
