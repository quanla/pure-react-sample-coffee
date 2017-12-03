import classnames from "classnames";
import {RComponent} from "../common/r-component";
import {animation} from "./animation";
import {keysCapture} from "./keys-capture";
import {Fs} from "../../utils/fs";
import {O} from "../../utils/object-util";

export class Sample extends RComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            mario: {
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                dir: "right"
            },
        };

        this.onUnmount(animation.loop((deltaTime) => {
            const {mario} = this.state;
            this.setState({mario: update(deltaTime/20, keysCapture.getHoldKeys(), mario)});
        }));

        const update = (dt, keys, mario) => Fs.invokeChain(mario, [
            (mario) => gravity( dt, mario ),
            (mario) => jump( keys, mario ),
            (mario) => walk( keys, mario ),
            (mario) => physics( dt, mario ),
        ]);

        const gravity = (dt, mario) => ({
            ...mario,
            vy: mario.y > 0 ? mario.vy - dt * 0.25 : 0
        });

        const jump = (keys, mario) =>
            !keys[38] || mario.vy !== 0 ? mario : {...mario, vy: 6.0}
        ;

        const walk = (keys, mario) =>
            keys[37] ? ({
                ...mario,
                vx: -2,
                dir: "left"
            }) : keys[39] ? ({
                ...mario,
                vx: 2,
                dir: "right"
            }) : mario.vx === 0 ? (
                mario
            ) : {
                ...mario,
                vx: 0
            };

        const physics = (dt, mario) => ({
            ...mario,
            x: mario.x + dt * mario.vx,
            y: Math.max( 0, (mario.y + dt * mario.vy) ),
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !O.equalDeep(nextState.mario, this.state.mario);
    }

    render() {
        const {mario} = this.state;

        return (
            <div className="sample">
                <div className="ground"/>

                <img
                    src={`/assets/img/mario/${mario.y > 0 ? "jump" : mario.vx !== 0 ? "walk" : "stand"}_${mario.dir}.gif`}
                    style={{
                        left: 100 + mario.x,
                        bottom: mario.y + 80,
                    }}
                />
            </div>
        );
    }
}
