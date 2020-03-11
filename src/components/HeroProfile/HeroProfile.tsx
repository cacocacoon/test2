import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Text, Button } from 'rebass';
import useHeroProfile from './useHeroProfile';

enum ABILITIES_TYPE {
	STR = 'str',
	INT = 'int',
	AGI = 'agi',
	LUK = 'luk'
}

const ABILITIES = Object.values(ABILITIES_TYPE);;
console.log(ABILITIES);
export default function HeroProfile(): JSX.Element {
	const { heroId } = useParams();
	const { profile, error, loading } = useHeroProfile(heroId);

	if (error) {
		return <span>error</span>;
	}

	const remainingPoints = profile.maxPoints - ABILITIES.reduce((accu, key) => accu + profile[key], 0);

	return (
		<>
			<hr />
			{ loading && (
				<span>loading...</span>
			) }
			<Flex>
				<Box width={ 1 / 2 }>
					{ ABILITIES.map(ability => (
						<Ablility
							key={ ability }
							ability={ ability }
							point={ profile[ability] }
							remainingPoints={ remainingPoints }
						/>
					)) }
				</Box>
				<Box width={ 1 / 2 }>
					2
				</Box>
			</Flex>
		</>
	);
}

type AblilityProps = {
	ability: string,
	point: number,
	remainingPoints: number
}

function Ablility(props: AblilityProps): JSX.Element {
	const { ability, point, remainingPoints } = props;

	return (
		<Flex justifyContent="center" alignItems="center" height={ 50 }>
			<Text>{ ability.toUpperCase() }</Text>
			<Button backgroundColor="#0275ff" disabled>+</Button>
			<Text>{ point }</Text>
			<Button backgroundColor="#0275ff">-</Button>
		</Flex>
	);
}