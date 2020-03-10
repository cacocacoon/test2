import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import MyHeroesBox from './styled/MyHeroesBox';
import MyHeroesHeading from './styled/MyHeroesHead';
import HeroCards from '../HeroCards/HeroCards';
import HeroProfile from '../HeroProfile/HeroProfile';

export default function MyHeroes(): JSX.Element {
	return (
		<MyHeroesBox>
			<MyHeroesHeading>Go Hero!</MyHeroesHeading>
			<Router>
				<HeroCards />
				<Switch>
					<Route path="/heroes/:heroId" component={ HeroProfile } exact />
					<Redirect to="/" />
				</Switch>
			</Router>
		</MyHeroesBox>
	);
}