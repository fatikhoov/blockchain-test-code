const { Block, Blockchain } = require('./BlockchainFile.js')

const JeChain = new Blockchain()
// Добавим новый блок
JeChain.addBlock(
  new Block(Date.now().toString(), { from: 'John', to: 'Bob', amount: 100 })
)
// (Это - всего лишь интересный эксперимент, для создания настоящей криптовалюты обычно нужно сделать намного больше, чем сделали мы).

// Вывод обновлённого блокчейна
console.log('вывод', JeChain.chain)
