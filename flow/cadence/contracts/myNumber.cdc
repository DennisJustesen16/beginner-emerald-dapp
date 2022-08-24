  pub contract myNumber {

    pub var aNumber: Int

    pub fun changeNumber(newNumber: Int) {
        self.aNumber = newNumber
    }

    init() {
        self.aNumber = 16
    }
}