import React, { ReactNode } from 'react';
import { Card, Image, Text } from 'rebass';
import { Link } from 'react-router-dom';
import { HeroData } from '../../api/responseType';

type Props  = {
	hero: HeroData
};

export default function HeroCard(props: Props): JSX.Element {
	const { hero } = props;

	return (
		<Link to={ `/heroes/${ hero.id }` }>
			<CustomCard>
				<Image
					src={ hero.image }
					alt={ hero.name }
					width="100%"
					height="100%"
					sx={ {
						borderRadius: '50%'
					} }
				/>
				<Text textAlign="center" color="black">{ hero.name }</Text>
			</CustomCard>
		</Link>
	);
}

type CustomCardProps = {
	children: ReactNode
}

function CustomCard(props: CustomCardProps): JSX.Element {
	const { children } = props;
	return (
		<Card
			display="inline-block"
			margin={ 2 }
			marginBottom={ 18 }
			width={ 180 }
			padding={ 24 }
			sx={ {
				cursor: 'pointer',
				borderRadius: 6,
				border: '1px solid #e8e8e8'
			} }
		>
			{ children }
		</Card>
	);
}

