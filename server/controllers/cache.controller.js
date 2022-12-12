
const path = require('path');
const fs = require('fs');
const {unlinkSync} = require('node:fs');

module.exports.delete = async function(req, res) {
  const {page, token}  = req.body;
  if(token !== process.env.NEXT_PUBLIC_CACHE_CLEAN) return res.status(401).json({message: 'You are not authorized to delete cache!'});
  if(!page) return res.status(404).json({message: 'file cache dose not exist!'});

  const filesDir = path.join(process.cwd(), 'cache');
  const pathFile = path.join(filesDir, `${page}.json`)

  if(!fs.existsSync(pathFile)) return res.status(404).json({message: 'file cache dose not exist!'});
  unlinkSync(pathFile);
  return res.status(204).json({message: 'Cache clean successfully!'})
}


// url: api/cache
// {
//   token: "paQSl30RRJKQ4LISIb3DQEBAQUAA4GMHjasdHAdas024AS7sdHADds9JDSJASK2q23+Uis5tkliIbyShFmaJ40sc1ZgRjNLCcUis5tkliIbyShFmaJ40sc1ZgRj68AADCBiAKB2Zh/EkvT2h41j1KVrlMmQmUC0",
//   page: "footer"
// }
