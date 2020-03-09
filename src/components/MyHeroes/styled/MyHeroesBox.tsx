import React from 'react';
import { Box } from 'rebass';

type Props = {
	children: React.ReactNode
};

export default function MyHeroesBox(props: Props): JSX.Element {
	const { children } = props;

	return (
		<Box
			width={ 850 }
			maxWidth="100%"
			marginX="auto"
			paddingX={ 15 }
			paddingTop={ 15 }
			paddingBottom={ 30 }
			backgroundColor="white"
			sx={ {
				borderRadius: 5
			} }
		>
			{ children }
		</Box>
		
	);
}
