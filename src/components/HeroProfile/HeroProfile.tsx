import React from 'react';
import { useParams } from 'react-router-dom';
import useHeroProfile from './useHeroProfile';

export default function HeroProfile(): JSX.Element {
	const { heroId } = useParams();
	const { profile, error, loading } = useHeroProfile(heroId);

	if (loading) {
		return <span>loading...</span>;
	}

	if (error) {
		return <span>error</span>;
	}

	

	

	return <div />;
}