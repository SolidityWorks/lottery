import React from "react";

import Countdown from "../../Components/Countdown/Countdown.jsx";
import { chainCheck, lastGame } from "../../contracts/funcs";
import { allGames, playersCount, ticketsCount, getCounter } from "../../contracts/funcs";
const { ethereum } = window;

const Lotto = () => {
  const [buy, setBuy] = React.useState(false);
  const [buyBtn, setBuyBtn] = React.useState("Connect wallet");
  const [totalGames, setTotalGames] = React.useState([]);
  const [tc, setTc] = React.useState(0);
  const [pc, setPc] = React.useState(0);
  const [totalGamesLoading, setTotalGamesLoading] = React.useState(false);

  let acc;
  const buyTickets = () => {
    setBuy(true);
    if (chainCheck()) {
      setBuyBtn("Buy");
    }
  };

  const close = () => {
    setBuy(false);
  };

  React.useEffect(() => {
    async function fetchData() {
      if (ethereum) {
        // MetaMask installed
        try {
          setTotalGamesLoading(true);
          const tp = [await ticketsCount(), await playersCount()];
          setPc(await ticketsCount());
          setTc(await playersCount());
          console.log(await lastGame());
          const reversedTotalGames = (await allGames()).reverse();
          setTotalGames(reversedTotalGames);
          setTotalGamesLoading(false);
        } catch (error) {
          setTotalGamesLoading(false);
          console.log("Error: ", error);
        }
      }
    }
    fetchData();
  }, [acc]);

  const unixConverter = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    return `${year}-${month}-${day}`;
  };

  const buyTicket = async () => {};

  (async function () {
    getCounter()
  })()

  return (
    <div className="lotto">
      <div className="container">
        <div className="lotto__inner">
          <div className="lotto__content">
            <div className={`lotto__wrapper${buy ? " buy__tickets" : ""}`}>
              <img
                className="lotto__stars--img"
                src="assets/img/stars.svg"
                alt="stars"
              />
              {buy ? (
                <div className="buy__inner">
                  <div className="buy__inner--top">
                    <p className="buy__title">Buy Tickets</p>

                    <img
                      onClick={close}
                      className="buy__close"
                      src="/assets/img/close.svg"
                      alt="Закрыть"
                    />
                  </div>

                  <div className="buy__inner--content">
                    <div className="buy__box">
                      <p className="buy__wrapper--title">Buy:</p>

                      <p className="buy__wrapper--value">Tickets</p>
                    </div>

                    <textarea
                      className="buy__textarea"
                      placeholder="0"
                    ></textarea>

                    <div className="buy__wrapper buy__box">
                      <p className="buy__wrapper--title">Cost (BNB)</p>

                      <p className="buy__wrapper--value">0 BNB</p>
                    </div>

                    <button onClick={buyTicket} className="button buy__button">
                      {buyBtn}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="line line1 bigline"></div>
                  <div className="line line2"></div>
                  <div className="line line3 bigline"></div>
                  <div className="line line4"></div>
                  <div className="line line5 bigline"></div>
                  <div className="line line6"></div>
                  <div className="line line7 bigline"></div>
                  <div className="line line8"></div>
                  <div className="line line9 bigline"></div>
                  <div className="line line10"></div>
                  <div className="line line11 bigline"></div>
                  <div className="line line12"></div>
                  <div className="line line13 bigline"></div>
                  <div className="line line14"></div>
                  <div className="line line15 bigline"></div>
                  <div className="line line16"></div>

                  <p className="lotto__text">Prize pot</p>

                  <p className="lotto__prize yellow">$220,555</p>

                  <div className="lotto__buy" onClick={buyTickets}>
                    <div className="lotto__buy--button">Buy tickets</div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="current-game">
            <div className="current-game__title">
              <h3 className="current-game__title--text">Current game</h3>
            </div>
          </div>
          <div className="how__inner nextdraw__inner">
            <img
              className="nextdraw__stars nextdraw__stars1"
              src="/assets/img/left-stars.svg"
              alt="stars"
            />
            <img
              className="nextdraw__stars nextdraw__stars2"
              src="/assets/img/right-stars.svg"
              alt="stars"
            />

            <p className="how__title yellow">Next draw in:</p>

            <div className="next__content">
              <Countdown hours={2} minutes={32} seconds={5} />

              <div className="next__item">
                <p className="next__item--title">{pc}</p>

                <p className="next__item--text yellow">players in this game</p>
              </div>

              <div className="next__item">
                <p className="next__item--title">{tc}</p>

                <p className="next__item--text yellow">tickets in this game</p>
              </div>
            </div>
          </div>

          <div className="how__inner">
            <p className="how__title yellow">How it works?</p>

            <div className="how__content">
              <div className="how__item">
                <div className="how__item--title">
                  Participate in lottery
                  <div className="how__item--num">1</div>
                </div>

                <div className="how__item--text">
                  Buy max <span className="yellow">200</span> tickets per
                  transaction
                </div>
              </div>

              <div className="how__item">
                <div className="how__item--title">
                  Wait for draw
                  <div className="how__item--num">2</div>
                </div>

                <div className="how__item--text">
                  The contract draw a lottery{" "}
                  <span className="yellow">every 7 days</span>
                </div>
              </div>

              <div className="how__item">
                <img className="star1" src="assets/img/star1.svg" alt="star" />
                <div className="how__item--title">
                  Check your prizes
                  <div className="how__item--num">3</div>
                </div>

                <div className="how__item--text">
                  Prizes automatically deposited{" "}
                  <span className="yellow">into wallet</span>
                </div>
              </div>
            </div>
          </div>

          <div className="how__inner">
            <div className="how__wrapper">
              <p className="how__title yellow">Lottery history:</p>

              <div className="history__buttons">
                <div className="history__button">
                  <img
                    className="history__button--img"
                    src="/assets/img/prev.svg"
                    alt="Стрелка"
                  />
                </div>

                <div className="history__button">
                  <img
                    className="history__button--img"
                    src="/assets/img/next.svg"
                    alt="Стрелка"
                  />
                </div>

                <div className="history__button">
                  <img
                    className="history__button--img"
                    src="/assets/img/all-next.svg"
                    alt="Стрелка"
                  />
                </div>
              </div>
            </div>

            <div className="history__content">
              <div className="history__item history__title">Game ID</div>

              <div className="history__item history__title">Date</div>

              <div className="history__item history__title">Winning ticket</div>

              <div className="history__item history__title">Prize</div>

              <div className="history__item history__title">Winner</div>

              <div className="history__item history__title">Tx</div>

              {!totalGamesLoading ? (
                totalGames.length ? (
                  totalGames.map((item, index) => {
                    const winner_hash = "0x218hi12dhgiu12x12xt1289tx1212x12",
                      transaction_hash = "0x218hi12dhgiu12x12xt1289tx1212x12"; //Demo data
                    return (
                      <React.Fragment key={index}>
                        <div className="history__item">
                          <span className="history__item--num">
                            {index + 1}
                          </span>
                        </div>

                        <div className="history__item">
                          {unixConverter(item.started)}
                        </div>

                        <div className="history__item">
                          {item.winnerTicketNumber}
                        </div>

                        <div className="history__item">
                          {item.ticketPrice}BNB
                        </div>

                        <div className="history__item" title={winner_hash}>
                          {winner_hash.slice(0, 4) +
                            "..." +
                            winner_hash.slice(-5)}
                        </div>

                        <div className="history__item" title={transaction_hash}>
                          {transaction_hash.slice(0, 4) +
                            "..." +
                            transaction_hash.slice(-5)}
                        </div>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <div className="history__empty">
                    <p className="history__empty--text">No Games Yet</p>
                  </div>
                )
              ) : (
                <div className="history__loader">
                  <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lotto;
