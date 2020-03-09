import React from 'react';
import useHeroesCards from './useHeroCards';
import HeroCardsBox from './styled/HeroCardsBox';
import Cards from './styled/Cards';

export default function HeroCards(): JSX.Element {
	const { heroes, loading } = useHeroesCards();

	return (
		<HeroCardsBox>
			{ loading && <div>loading...</div> }
			<Cards>
				{ heroes.map(hero => (
					<div key={ hero.id } className="card-wrapper" />
				)) }
			</Cards>
		</HeroCardsBox>
	);
}

