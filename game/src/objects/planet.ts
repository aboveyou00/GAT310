import { GameObject, GameObjectOptions } from 'engine';
import { BallObject, BallOptions } from './ball';
import merge = require('lodash.merge');

const PLANET_RADIUS = 32;

export class PlanetObject extends BallObject {
    constructor(opts?: Partial<BallOptions>) {
        super('Planet', merge(opts, {
            color: 'blue',
            radius: PLANET_RADIUS
        }));
    }
}
