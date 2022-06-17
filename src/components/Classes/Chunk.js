
import {v4 as uuidv4} from 'uuid';
export default class Chunk {
    constructor(position){
        this.position = position;
        this.state = [...Array(100)].map(e => Array(100));
        this.id = uuidv4()

    }











}