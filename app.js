'use strict';

import fs from "fs"
import path from "path"
import {promisify} from 'util';
import moment from 'moment';

const readDir = promisify(fs.readdir)
const stats = promisify(fs.stat)
	
const readMe = async () => {
	try {
	 let files = await fileInfo()
	 return files.sort((a,b) => { a.atime - b.atime })
	 	return files.map((f) => {
	 		let formattedADate = moment(f['atime']).format('MMMM Do YYYY, h:mm:ss a')
	 		let formattedMDate = moment(f['mtime']).format('MMMM Do YYYY, h:mm:ss a')
	 		return Object.assign({}, f, {atime: formattedMDate, mtime: formattedMDate } )
		})
	}
	catch (e) {
		return e
	}
	
}

const fileInfo = async () => {
	let fileInfo = []
	let files = await readDir(path.resolve('.'))
	let obj = {}
	return Promise.all( files.map ( async (f) => { 
		let fStats = await stats( path.resolve('.', f) )
		return {
			name: f, 
			dev: fStats['dev'],
			mode: fStats['mode'],
			nlink: fStats['nlink'],
			uid: fStats['uid'],
			gid: fStats['gid'],
			rdev: fStats['rdev'],
			blksize: fStats['blksize'],
			ino: fStats['ino'],
			size: fStats['size'],
			blocks: fStats['blocks'],
			atime: fStats['atime'],
			mtime: fStats['mtime'],
			ctime: fStats['ctime'],
			birthtime: fStats['birthtime']
		}
	}))
}
 
readMe().then(res => console.log(res))