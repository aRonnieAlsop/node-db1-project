const Account = require('./accounts-model')

const db = require('../../data/db-config')

const checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body
  if (!name || !budget) {
    next({ status: 400, message: 'name and budget are required' })
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({ status: 400, message: 'name of account must be between 3 and 100' })
  } else if (budget < 0 || budget > 1000000) {
    next({ status: 400, message: 'budget of account is too large or too small' })
  } else {
    req.body.name = name.trim()
    next()
  }
}

const checkAccountNameUnique = async (req, res, next) => {
  try {
    const notUnique = await db('accounts').where('name', req.body.name.trim()).first()
    if (notUnique) {
      next({ status: 400, message: 'that name is taken' })
    }
  } catch (err) {
    next(err)
  }
}

const checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id)
    if (!account) {
      next({ status: 404, message: 'account not found'})
    } else {
      req.account = account
      next()
    }
  } catch (err) { 
    next(err) 
  }
}

module.exports = {
  checkAccountId,
 checkAccountNameUnique,
  checkAccountPayload

}