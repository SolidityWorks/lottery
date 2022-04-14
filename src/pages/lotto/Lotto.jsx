import React from "react";

import Countdown from "../../Components/Countdown/Countdown.jsx";
import {
  chainCheck,
  getCounter,
  lastGame,
  buyTicket,
} from "../../contracts/funcs";
import { allGames, playersCount, ticketsCount } from "../../contracts/funcs";
const { ethereum } = window;

const Lotto = ({ account, walletConnectHandler }) => {
  const [transactionText, setTransactionText] = React.useState("");
  const [isNotificationActive, setIsNotificationActive] = React.useState(false);
  const [yourTickets, setYourTickets] = React.useState(false);
  const [isGameActive, setIsGameActive] = React.useState(false);
  const [isTransactionSucced, setIsTransactionSucced] = React.useState(false);
  const [currentGame, setCurrentGame] = React.useState(0);
  const [currentTicketPrice, setCurrentTicketPrice] = React.useState(0);
  const [ticketsWillBuy, setTicketsWillBuy] = React.useState("");
  const [totalCost, setTotalCost] = React.useState(0);
  const [buy, setBuy] = React.useState(false);
  const [buyBtn, setBuyBtn] = React.useState("Connect wallet");
  const [totalGames, setTotalGames] = React.useState([]);
  const [tc, setTc] = React.useState(0);
  const [pc, setPc] = React.useState(0);
  const [totalGamesLoading, setTotalGamesLoading] = React.useState(false);
  const [counterLoading, setCounterLoading] = React.useState(false);
  const [timer, setTimer] = React.useState(false);

  const gameToggler = (boolean) => {
    setIsGameActive(boolean);
  };

  const successTransaction = (value) => {
    setIsNotificationActive(true);
    if (value === "success") {
      setIsTransactionSucced(true);
      setTransactionText("succeed");
    } else {
      setIsTransactionSucced(false);
      setTransactionText("failed");
    }
    setTimeout(() => {
      setIsNotificationActive(false);
    }, 4000);
  };

  const viewTickets = () => {
    setYourTickets(true);
  };

  const closeTickets = () => {
    setYourTickets(false);
  };

  const buyTicketsModal = () => {
    setBuy(true);
    setYourTickets(false);
  };

  const buyTickets = () => {
    setBuy(true);
    if (chainCheck() && ethereum._state?.accounts[0]) {
      setBuyBtn("Buy");
    } else {
      setBuyBtn("Connect wallet");
    }
  };

  const close = () => {
    setBuy(false);
  };

  React.useEffect(() => {
    if (isGameActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isGameActive]);

  React.useEffect(() => {
    async function fetchData() {
      setCounterLoading(true);
      try {
        setTimer(await getCounter());
        setCounterLoading(false);
      } catch (error) {
        setCounterLoading(false);
        console.log("Error: ", error);
      }
    }
    fetchData();
  }, [account]);

  React.useEffect(() => {
    async function fetchData() {
      if (ethereum) {
        // MetaMask installed
        try {
          setTotalGamesLoading(true);
          const reversedTotalGames = (await allGames()).reverse();
          setTotalGames(reversedTotalGames);
          setTotalGamesLoading(false);

          setTc(await ticketsCount());
          setPc(await playersCount());

          let { started, ticketPrice } = await lastGame();
          setCurrentGame({ started });
          setCurrentTicketPrice(ticketPrice);
        } catch (error) {
          setTotalGamesLoading(false);
          console.error("Error: ", error);
        }
      }
    }
    fetchData();
  }, [account]);

  const unixConverter = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="lotto">
      <div
        className={`lotto__message${isNotificationActive ? " active" : ""}${
          isTransactionSucced ? " lotto__success" : " lotto__fail"
        }`}
      >
        <div className="lotto__message-text">Transaction {transactionText}</div>
      </div>
      {isGameActive ? (
        <div className="lotto__loader">
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
          <div className="status">
            Processing<span className="status__dot">.</span>
            <span className="status__dot">.</span>
            <span className="status__dot">.</span>
          </div>
        </div>
      ) : null}
      <div className={`modal${yourTickets ? " active" : ""}`}>
        <div className="buy__inner">
          <div className="buy__inner--top game">
            <p className="buy__title game">Round 488</p>

            <img
              onClick={closeTickets}
              className="buy__close"
              src="/assets/img/close-yellow.svg"
              alt="Закрыть"
            />
          </div>

          <div className="buy__inner--content">
            <div className="your__tickets">
              <p className="buy__text yellow">Your tickets</p>

              <div className="your__tickets--inner">
                <p className="your__tickets--item">100</p>

                <p className="your__tickets--item">101</p>

                <p className="your__tickets--item">102</p>

                <p className="your__tickets--item">103</p>

                <p className="your__tickets--item">104</p>

                <p className="your__tickets--item">105</p>

                <p className="your__tickets--item">106</p>

                <p className="your__tickets--item">107</p>

                <p className="your__tickets--item">108</p>

                <p className="your__tickets--item">109</p>

                <p className="your__tickets--item">110</p>

                <p className="your__tickets--item">111</p>
              </div>
            </div>

            <button
              onClick={buyTicketsModal}
              className="button buy__button game"
            >
              Buy tickets
            </button>
          </div>
        </div>
      </div>
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

                    <input
                      min="0"
                      max="200"
                      type="number"
                      className="buy__textarea"
                      placeholder="0"
                      value={ticketsWillBuy}
                      onChange={(event) => {
                        const value = event.target.value;
                        if (value <= 200) {
                          setTicketsWillBuy(value);
                          setTotalCost(value * currentTicketPrice);
                        } else {
                          setTicketsWillBuy(200);
                          setTotalCost(200 * currentTicketPrice);
                          alert("You can buy maximum 200 tickets");
                        }
                      }}
                    />

                    <div className="buy__wrapper buy__box">
                      <p className="buy__wrapper--title">Cost (BNB)</p>

                      <p className="buy__wrapper--value">{totalCost} BNB</p>
                    </div>

                    <button
                      onClick={
                        account
                          ? () =>
                              buyTicket(
                                totalCost,
                                ticketsWillBuy,
                                gameToggler,
                                successTransaction
                              )
                          : walletConnectHandler
                      }
                      className="button buy__button"
                    >
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
                  <div className="ticket-price">
                    <div className="ticket-price__text">
                      1 ticket = {currentTicketPrice} BNB
                    </div>
                  </div>
                </>
              )}
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
              <div className="next__item">
                {!counterLoading ? (
                  timer ? (
                    <Countdown timer={timer} />
                  ) : (
                    <div className="next__content--empty">
                      There is no timer
                    </div>
                  )
                ) : (
                  <div className="next__loader">
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
              <div className="next__item">
                <p className="next__text">Your tickets</p>

                <button
                  className="button next__text yellow"
                  onClick={viewTickets}
                >
                  View
                </button>

                <button className="button default__button" onClick={buyTickets}>
                  <span className="default__button--wrapper">Buy tickets</span>
                </button>
              </div>
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
