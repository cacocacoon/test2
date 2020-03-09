import React from 'react';
import { Box } from 'rebass';

type Props = {
	children: React.ReactNode;
};

export default function Cards(props: Props): JSX.Element {
	const { children } = props;

	return (
		<Box width={ 784 } marginX="auto">
			{ children }
		</Box>
	);
}