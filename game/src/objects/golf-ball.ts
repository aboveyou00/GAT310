import { GameObject, GameObjectOptions } from 'engine';
import { BallObject, BallOptions } from './ball';
import merge = require('lodash.merge');

const GOLF_BALL_RADIUS = 24;

export class GolfBallObject extends BallObject {
    constructor(opts?: Partial<BallOptions>) {
        super('GolfBall', merge(opts, {
            color: 'white',
            radius: GOLF_BALL_RADIUS
        }));
    }
}
