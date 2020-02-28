import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

type Props = {
	a: (n: number) => number
}

function App(props: Props): JSX.Element {
	const { a } = props;
	const [value] = useState<number[]>([]);
	a(value?.[2]);
	let abc = 1;
	function func(v?: number) {
		a(v!++ + abc);
	}
	func();
	const c = 1;
	return (
		<div className="App">
			<header className="App-header">
				<img src={ logo } className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
