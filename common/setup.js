import mlog from 'mocha-logger';
import { remote } from 'webdriverio';
import {remoteConfig} from '../config/remote.config.js';

export default async function setup(){
    mlog.log("starting browser ...")
    return await remote(remoteConfig); 
} 