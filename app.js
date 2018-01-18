
import fs from "fs"
import path from "path"
import {promisify} from 'util';
import moment from 'moment';
import rmf from "recently-modified-files";

rmf(path.resolve('/Users/lexalexander/Documents/codestuff'), (err, files) => console.log("module ", files))
const readDir = promisify(fs.readdir)
const stats = promisify(fs.stat)

const formatTimeStamp = (ts) => moment(ts, moment.ISO_8601).format('MMMM Do YYYY, h:mm:ss a')

const readMe = async () => {
	try {
	 let files = await fileInfo()
	 let retrieveOnlyProperFiles;
	 
	 retrieveOnlyProperFiles = files.filter(f => f.stats.isFile())
	 
	 return retrieveOnlyProperFiles.sort((a, b) => {
    	return (a.stats.mtime - b.stats.mtime) ? -1 : ((a.date > b.date) ? 1 : 0) 
  	}).map((f) => {
  		return {name: f.name, lastAccessed: formatTimeStamp(f.stats.atime)}
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
			return {name: f, stats: fStats}
	}))
}



let ignoreHiddenFiles = true 
readMe().then(res => console.log(res))


// let times = [ 2017-08-11T18:20:52.000Z,
//   2017-08-11T18:20:52.000Z,
//   2017-08-11T05:34:44.000Z,
//   2017-08-11T18:20:52.000Z,
//   2017-08-11T05:34:43.000Z,
//   2017-08-11T18:20:51.000Z ]

//  times.map(t => console.log(formatTimeStamp(t)))