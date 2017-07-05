import { GameObject, GameObjectOptions } from 'engine';
import { BallObject, BallOptions } from './ball';
import merge = require('lodash.merge');

const BOWLING_BALL_RADIUS = 48;

export class BowlingBallObject extends BallObject {
    constructor(opts?: Partial<BallOptions>) {
        super('BowlingBall', merge(opts, {
            color: 'green',
            radius: BOWLING_BALL_RADIUS
        }));
    }
}
