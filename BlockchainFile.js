const crypto = require('crypto'),
  SHA256 = (message) =>
    crypto.createHash('sha256').update(message).digest('hex')

class Block {
  constructor(timestamp = '', data = []) {
    this.timestamp = timestamp
    this.data = data
    this.hash = this.getHash()
    this.prevHash = '' // хеш предыдущего блока
    this.nonce = 0
  }

  // Наша хеш-функция.
  getHash() {
    return SHA256(
      this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce
    )
  }

  mine(difficulty) {
    // Тут запускается цикл, работающий до тех пор, пока хеш не будет начинаться со строки
    // 0...000 длины <difficulty>.
    while (!this.hash.startsWith(Array(difficulty + 1).join('0'))) {
      // Инкрементируем nonce, что позволяет получить совершенно новый хеш.
      this.nonce++
      // Пересчитываем хеш блока с учётом нового значения nonce.
      this.hash = this.getHash()
    }
  }
}

class Blockchain {
  constructor() {
    // Создаём первичный блок
    this.chain = [new Block(Date.now().toString())]
    this.difficulty = 1
  }
  addBlock(block) {
    block.prevHash = this.getLastBlock().hash
    block.hash = block.getHash()
    block.mine(this.difficulty)
    this.chain.push(block)
  }
  isValid() {
    // Перед перебором цепочки блоков нужно установить i в 1, так как до первичного блока никаких блоков нет. В результате мы начинаем со второго блока.
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const prevBlock = this.chain[i - 1]

      // Проверка
      if (
        currentBlock.hash !== currentBlock.getHash() ||
        prevBlock.hash !== currentBlock.prevHash
      ) {
        return false
      }
    }

    return true
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1]
  }
}

module.exports = { Block, Blockchain }
