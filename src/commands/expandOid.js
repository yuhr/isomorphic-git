import path from 'path'

import { GitObjectManager } from '../managers/GitObjectManager.js'
import { FileSystem } from '../models/FileSystem.js'
import { cores } from '../utils/plugins.js'

/**
 * Expand and resolve a short oid into a full oid
 *
 * @link https://isomorphic-git.github.io/docs/expandOid.html
 */
export async function expandOid ({
  core = 'default',
  dir,
  gitdir = path.join(dir, '.git'),
  fs: _fs = cores.get(core).get('fs'),
  oid
}) {
  try {
    const fs = new FileSystem(_fs)
    const fullOid = await GitObjectManager.expandOid({
      fs,
      gitdir,
      oid
    })
    return fullOid
  } catch (err) {
    err.caller = 'git.expandOid'
    throw err
  }
}