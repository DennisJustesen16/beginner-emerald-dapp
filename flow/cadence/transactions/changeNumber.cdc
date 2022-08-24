import myNumber from "../contracts/myNumber.cdc"

transaction(myNewNumber: Int) {

  prepare(signer: AuthAccount) {}

  execute {
    myNumber.changeNumber(newNumber: myNewNumber)
  }
}