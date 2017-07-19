import { GameObject, GameObjectOptions } from 'engine';
import { BallObject, BallOptions } from './ball';
import merge = require('lodash.merge');

const SUN_RADIUS = 128;

export class SunObject extends BallObject {
    constructor(opts?: Partial<BallOptions>) {
        super('Sun', merge(opts, {
            color: 'yellow',
            radius: SUN_RADIUS
        }));
    }
}
