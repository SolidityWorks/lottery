import React from 'react';

const Countdown = ({days = 0, hours = 0, minutes = 0, seconds = 0}) => {
	const [d, setD] = React.useState(days);
	const [h, setH] = React.useState(hours);
	const [m, setM] = React.useState(minutes);
	const [s, setS] = React.useState(seconds);

	const tick = () => {
		if(s > 0){
			setS(s - 1);
		}
		else if(m > 0){
			setS(59);
			setM(m - 1);
		}
		else if(h > 0){
			setS(59);
			setM(59);
			setH(h - 1);
		}
		else if(d > 0){
			setS(59);
			setM(59);
			setH(23);
			setD(d - 1);
		}
	}

	React.useEffect(() => {
	    const timerID = setInterval(() => tick(), 1000);
	    return () => clearInterval(timerID);
	});

	return(
		<div className="next__item">
			<div className="next__time--item">
				<p className="next__time--num">
					{d}
				</p>

				<p className="next__time--label">
					days
				</p>
			</div>

			<div className="next__time--dots">
				:
			</div>

			<div className="next__time--item">
				<p className="next__time--num">
					{h}
				</p>

				<p className="next__time--label">
					hours
				</p>
			</div>

			<div className="next__time--dots">
				:
			</div>

			<div className="next__time--item">
				<p className="next__time--num">
					{m}
				</p>

				<p className="next__time--label">
					minutes
				</p>
			</div>

			<div className="next__time--dots">
				:
			</div>

			<div className="next__time--item">
				<p className="next__time--num">
					{s}
				</p>

				<p className="next__time--label">
					seconds
				</p>
			</div>
		</div>
	)
}

export default Countdown;