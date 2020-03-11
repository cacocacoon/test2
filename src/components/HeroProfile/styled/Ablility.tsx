import React from 'react';
import { Button, Flex, Text } from 'rebass';

type AblilityProps = {
	ability: string,
	point: number,
	remainingPoints: number
}

export default function Ablility(props: AblilityProps): JSX.Element {
	const { ability, point, remainingPoints } = props;

	return (
		<Flex justifyContent="space-around" alignItems="center" height={ 50 }>
			<Text width={ 40 }>{ ability.toUpperCase() }</Text>
			<CircleButton>+</CircleButton>
			<Text width={ 40 }>{ point }</Text>
			<CircleButton>-</CircleButton>
		</Flex>
	);
}

function CircleButton({ children, ...props }: { children: React.ReactNode }): JSX.Element {
	return (
		<Button
			width={ 40 }
			height={ 40 }
			padding={ 0 }
			backgroundColor="#0275ff"
			sx={ { borderRadius: '50%' } }
			{ ...props }
		>
			{ children }
		</Button>
	);
}