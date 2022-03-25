import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';

const Flipper = () => {
	React.useEffect(() => {
	    $(".win__button").on("click", function(){
	        $(".main__coin--inner").removeClass("lose");
	        $(".main__coin--inner").addClass("win");
	        $(".win__scene").addClass("active");
	        $(".lose__scene").removeClass("active");
	    });

	    $(".lose__button").on("click", function(){
	        $(".main__coin--inner").removeClass("win");
	        $(".main__coin--inner").addClass("lose");
	        $(".win__scene").removeClass("active");
	        $(".lose__scene").addClass("active");
	    });

	    $(".go__button").on("click", function(){
	        $(".main__coin--inner").removeClass("lose");
	        $(".main__coin--inner").removeClass("win");
	        $(".win__scene").removeClass("active");
	        $(".lose__scene").removeClass("active");
	    });
	}, []);

	return(
		<>
            <div className="scene">
                <div className="win__scene">
                    <img className="bg__coin coin1" src="/assets/img/win-bg.svg" alt="Монета" />
                    <img className="bg__coin coin2" src="/assets/img/win-bg.svg" alt="Монета" />
                    <img className="bg__coin coin3" src="/assets/img/win-bg.svg" alt="Монета" />
                    <img className="bg__coin coin4" src="/assets/img/win-bg.svg" alt="Монета" />
                    <img className="bg__coin coin5" src="/assets/img/win-bg.svg" alt="Монета" />
                    <img className="bg__coin coin6" src="/assets/img/win-bg.svg" alt="Монета" />
                    <img className="bg__coin coin7" src="/assets/img/win-bg.svg" alt="Монета" />
                    <img className="bg__coin coin8" src="/assets/img/win-bg.svg" alt="Монета" />
                    <img className="bg__coin coin9" src="/assets/img/win-bg.svg" alt="Монета" />
                    <img className="bg__coin coin10" src="/assets/img/win-bg.svg" alt="Монета" />
                    <img className="bg__coin coin11" src="/assets/img/win-bg.svg" alt="Монета" />
                    <img className="bg__coin coin12" src="/assets/img/win-bg.svg" alt="Монета" />
                    <img className="bg__coin coin13" src="/assets/img/win-bg.svg" alt="Монета" />
                    <img className="bg__coin coin14" src="/assets/img/win-bg.svg" alt="Монета" />
                    <img className="bg__coin coin15" src="/assets/img/win-bg.svg" alt="Монета" />
                    <img className="bg__coin coin16" src="/assets/img/win-bg.svg" alt="Монета" />
                    <img className="bg__coin coin17" src="/assets/img/win-bg.svg" alt="Монета" />
                    <img className="bg__coin coin18" src="/assets/img/win-bg.svg" alt="Монета" />
                </div>

                <div className="lose__scene">
                    <img className="bg__coin coin1" src="/assets/img/loss-bg.svg" alt="Монета" />
                    <img className="bg__coin coin2" src="/assets/img/loss-bg.svg" alt="Монета" />
                    <img className="bg__coin coin3" src="/assets/img/loss-bg.svg" alt="Монета" />
                    <img className="bg__coin coin4" src="/assets/img/loss-bg.svg" alt="Монета" />
                    <img className="bg__coin coin5" src="/assets/img/loss-bg.svg" alt="Монета" />
                    <img className="bg__coin coin6" src="/assets/img/loss-bg.svg" alt="Монета" />
                    <img className="bg__coin coin7" src="/assets/img/loss-bg.svg" alt="Монета" />
                    <img className="bg__coin coin8" src="/assets/img/loss-bg.svg" alt="Монета" />
                    <img className="bg__coin coin9" src="/assets/img/loss-bg.svg" alt="Монета" />
                    <img className="bg__coin coin10" src="/assets/img/loss-bg.svg" alt="Монета" />
                    <img className="bg__coin coin11" src="/assets/img/loss-bg.svg" alt="Монета" />
                    <img className="bg__coin coin12" src="/assets/img/loss-bg.svg" alt="Монета" />
                    <img className="bg__coin coin13" src="/assets/img/loss-bg.svg" alt="Монета" />
                    <img className="bg__coin coin14" src="/assets/img/loss-bg.svg" alt="Монета" />
                    <img className="bg__coin coin15" src="/assets/img/loss-bg.svg" alt="Монета" />
                    <img className="bg__coin coin16" src="/assets/img/loss-bg.svg" alt="Монета" />
                    <img className="bg__coin coin17" src="/assets/img/loss-bg.svg" alt="Монета" />
                    <img className="bg__coin coin18" src="/assets/img/loss-bg.svg" alt="Монета" />
                </div>
            </div>

            <section className="main">
                <div className="container">
                    <div className="main__inner">
                        <div className="main__coin--inner">
                            <img src="/assets/img/front.svg" className="main__coin front" alt="Монетка" />
                            <img src="/assets/img/back.svg" className="main__coin back" alt="Монетка" />

                            <img src="/assets/img/win.svg" className="main__coin win" alt="Монетка" />
                            <img src="/assets/img/loss.svg" className="main__coin lose" alt="Монетка" />
                        </div>

                        <div className="main__content">
                            <div className="main__wrapper">
                                <div className="main__wrapper--title">
                                    Global stats
                                </div>

                                <div className="main__wrapper--stats">
                                    <p className="main__stats--title">
                                        184397 spins
                                    </p>

                                    <div className="main__stats--content">
                                        <div className="main__stats--item">
                                            <p className="main__stats--text yellow">
                                                Heads
                                            </p>

                                            <p className="main__stats--text orange">
                                                Tails
                                            </p>
                                        </div>

                                        <div className="main__stats--indicator"></div>

                                        <div className="main__stats--item">
                                            <p className="main__stats--text yellow">
                                                92187
                                            </p>

                                            <p className="main__stats--text orange">
                                                92187
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="main__item">
                                <div className="main__button--inner">
                                    <button className="button default__button draw bet__button win__button">
                                        <span className="default__button--wrapper">
                                            One
                                        </span>
                                    </button>

                                    <button className="button default__button draw bet__button lose__button">
                                        <span className="default__button--wrapper">
                                            Two
                                        </span>
                                    </button>
                                </div>

                                <div className="main__bet--inner">
                                    <button className="button main__bet">
                                        0.05 sol
                                    </button>

                                    <button className="button main__bet">
                                        0.1 sol
                                    </button>

                                    <button className="button main__bet">
                                        0.25 sol
                                    </button>

                                    <button className="button main__bet">
                                        0.5 sol
                                    </button>

                                    <button className="button main__bet">
                                        1 sol
                                    </button>

                                    <button className="button main__bet">
                                        2 sol
                                    </button>
                                </div>

                                <button className="button default__button draw button__draw go__button">
                                    <span className="default__button--wrapper">
                                        Draw
                                    </span>
                                </button>
                            </div>

                            <div className="main__wrapper">
                                <div className="main__wrapper--title">
                                    Top players
                                </div>

                                <div className="main__wrapper--player">
                                    <div className="main__wrapper--item">
                                        1. GFv50gh... - <span className="yellow">10 sol</span>
                                    </div>

                                    <div className="main__wrapper--item">
                                        2. GFv50ghll... - <span className="yellow">8 sol</span>
                                    </div>

                                    <div className="main__wrapper--item">
                                        3. GFv50g... - <span className="yellow">7.25 sol</span>
                                    </div>

                                    <div className="main__wrapper--item">
                                        4. GFv50gh... - <span className="yellow">5.5 sol</span>
                                    </div>

                                    <div className="main__wrapper--item">
                                        5. GFv50gh... - <span className="yellow">4.3 sol</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="games__content">
                            <div className="main__wrapper--title">
                                My games
                            </div>

                            <div className="games__wrapper">
                                <div className="games__item yellow">
                                    Time
                                </div>

                                <div className="games__item yellow">
                                    Transaction
                                </div>

                                <div className="games__item yellow">
                                    Bid
                                </div>

                                <div className="games__item yellow">
                                    Result
                                </div>

                                <div className="games__item">
                                    1
                                </div>

                                <div className="games__item">
                                    g5Gf...xn68g
                                </div>

                                <div className="games__item">
                                    1 sol
                                </div>

                                <div className="games__item">
                                    Loose
                                </div>

                                <div className="games__item">
                                    2
                                </div>

                                <div className="games__item">
                                    g5Gf...xn68g
                                </div>

                                <div className="games__item">
                                    2 sol
                                </div>

                                <div className="games__item">
                                    Win
                                </div>

                                <div className="games__item">
                                    3
                                </div>

                                <div className="games__item">
                                    g5Gf...xn68g
                                </div>

                                <div className="games__item">
                                    2 sol
                                </div>

                                <div className="games__item">
                                    Win
                                </div>

                                <div className="games__item">
                                    4
                                </div>

                                <div className="games__item">
                                    g5Gf...xn68g
                                </div>

                                <div className="games__item">
                                    5 sol
                                </div>

                                <div className="games__item">
                                    Win
                                </div>

                                <div className="games__item">
                                    5
                                </div>

                                <div className="games__item">
                                    g5Gf...xn68g
                                </div>

                                <div className="games__item">
                                    1 sol
                                </div>

                                <div className="games__item">
                                    Loose
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
	)
}

export default Flipper;