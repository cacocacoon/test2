import React from 'react';
import useHeroesCards from './useHeroCards';
import HeroCardsBox from './styled/HeroCardsBox';
import Cards from './styled/Cards';
import HeroCard from '../../components/HeroCard/HeroCard';

export default function HeroCards(): JSX.Element {
	const { heroes, loading } = useHeroesCards();

	return (
		<HeroCardsBox>
			{ loading && <div>loading...</div> }
			<Cards>
				{ heroes.map(hero => (
					<HeroCard key={ hero.id } hero={ hero } />
				)) }
			</Cards>
		</HeroCardsBox>
	);
}

