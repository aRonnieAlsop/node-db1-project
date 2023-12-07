const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC

  return db('accounts').where('id', id).first()
}

async function create({ name, budget}) {
  const [id] = await db('accounts').insert({ name, budget })
  return getById(id)
}

async function updateById(id, { name, budget }) {
  await db('accounts').where('id', id).update({ name, budget })
  return getById(id)
}

async function deleteById(id) {
  const toBeDeleted = await getById(id)
  await db('users').where('id', id).delete()
  return toBeDeleted
}


module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
