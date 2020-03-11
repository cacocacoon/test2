import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Text, Button } from 'rebass';
import useHeroProfile from './useHeroProfile';
import Ablility from './styled/Ablility';

enum ABILITIES_TYPE {
	STR = 'str',
	INT = 'int',
	AGI = 'agi',
	LUK = 'luk'
}

const ABILITIES = Object.values(ABILITIES_TYPE);

export default function HeroProfile(): JSX.Element {
	const { heroId } = useParams();
	const { profile, loading } = useHeroProfile(heroId);

	if (loading) {
		return <span>loading...</span>;
	}

	const remainingPoints = profile.maxPoints - ABILITIES.reduce((accu, key) => accu + profile[key], 0);

	return (
		<>
			<hr />
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
				<Flex width={ 1 / 2 } flexDirection="column" alignItems="flex-end" justifyContent="flex-end">
					<Text>剩餘點數：{ remainingPoints }</Text>
					<Button backgroundColor="#0275ff">儲存</Button>
				</Flex>
			</Flex>
		</>
	);
}
