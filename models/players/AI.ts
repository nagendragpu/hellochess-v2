import Player from './Player';
import Ratings from '../ratings/Ratings';

export default class AI extends Player {
    constructor(
        _io: any,
        _username: string
    ) {
        let defaultRatings: Ratings = new Ratings(1200, 1200, 1200, 1200);
        
        super(
            null,
            _username,
            _username,
            "https://openclipart.org/image/75px/svg_to_png/168755/cartoon-robot.png&disposition=attachment",
            false,
            "",
            defaultRatings,
            defaultRatings,
            defaultRatings,
            defaultRatings);
    }
}