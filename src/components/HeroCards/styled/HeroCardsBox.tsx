import React from 'react';
import { Box } from 'rebass';

type Props = {
	children: React.ReactNode;
};

export default function HeroCardsBox(props: Props): JSX.Element {
	const { children } = props;

	return (
		<Box width="100%" overflowY="auto">
			{ children }
		</Box>
	);
}