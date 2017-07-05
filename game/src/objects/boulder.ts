import { GameObject, GameObjectOptions } from 'engine';
import { BallObject, BallOptions } from './ball';
import merge = require('lodash.merge');

const BOULDER_RADIUS = 128;

export class BoulderObject extends BallObject {
    constructor(opts?: Partial<BallOptions>) {
        super('Boulder', merge(opts, {
            color: 'grey',
            radius: BOULDER_RADIUS
        }));
    }
}
