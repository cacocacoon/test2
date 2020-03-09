import React from 'react';
import { Heading } from 'rebass';

type Props = {
	children: React.ReactNode
};

export default function MyHeroesHead(props: Props): JSX.Element {
	const { children } = props;

	return (
		<Heading
			marginTop={ 0 }
			marginBottom="0.5em"
			color="rgba(0, 0, 0, .85)"
			fontSize={ 28 }
			fontWeight={ 500 }
		>
			{ children }
		</Heading>
	);
}