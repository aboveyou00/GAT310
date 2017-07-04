import { GameObject, GameObjectOptions } from 'engine';
import { BallObject } from './ball';
import merge = require('lodash.merge');

const BOULDER_RADIUS = 48;

export class BoulderObject extends BallObject {
    constructor(opts?: GameObjectOptions) {
        super('Boulder', merge(opts, {
            color: 'grey',
            radius: BOULDER_RADIUS
        }));
    }
}
