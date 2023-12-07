const Account = require('./accounts-model')
const { 
        checkAccountId, 
        checkAccountNameUnique, 
        checkAccountPayload
      } = require('./accounts-middleware')

const router = require('express').Router()

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res) => {
  // DO YOUR MAGIC
  res.status(200).json(id)
})

router.post('/', checkAccountPayload, checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const newAccount = await Account.create(req.body)
    res.status(201).json(newAccount)
  } catch(err) {
    next(err)
  }
})

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const updatedAccount = await Account.update(req.params.id, req.body)
    res.status(200).json(updatedAccount)
  } catch(err) {
    next(err)
  }
})

router.delete('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const deletedAccount = Account.delete(req.params.id)
    res.status(200).json(deletedAccount)
  } catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
