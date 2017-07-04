import { GameObject, GameObjectOptions } from 'engine';
import { BallObject } from './ball';
import merge = require('lodash.merge');

const GOLF_BALL_RADIUS = 12;

export class GolfBallObject extends BallObject {
    constructor(opts?: GameObjectOptions) {
        super('GolfBall', merge(opts, {
            color: 'white',
            radius: GOLF_BALL_RADIUS
        }));
    }
}
