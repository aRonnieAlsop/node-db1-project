const Account = require('./accounts-model')

const checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body
  if (name && budget) {
    const tidyName = name
    const numberfied = parseInt(budget)
    if (tidyName > 100 || tidyName < 3) {
      next({ 
        message:"name of account must be between 3 and 100" 
      })
    } else if (typeof(numberfied) === NaN) {
      next({
        message: "budget of account must be a number"
      })
      } else if (numberfied < 0 || numberfied > 1000000) {
        message: "budget of account is too large or too small"
      } else {
        next()
      }
    } else {
    next({ status: 400, message: "name and budget are required"})
  }
  const tidyName = name.trim()

}

const checkAccountNameUnique = (req, res, next) => {
  const name = { name }
  if (name !== req.body.name) {
    next()
  } else {
    next({ status: 400, message:"that name is taken" })
  }
  // DO YOUR MAGIC
}

async function checkAccountId (req, res, next) {
  try {
    const account = await Account.getById(req.params.id)
    if (account) {
      req.account = account
      next()
    } else {
      next({ status: 404, message: "account not found" })
    }
  } catch (err) { next(err) }
}

module.exports = {
  checkAccountId,
 checkAccountNameUnique,
  checkAccountPayload

}