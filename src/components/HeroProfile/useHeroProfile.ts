import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store';
import { heroProfileFetcher } from '../../api/fetcher';
import { setProfile, ProfileWithMaxPoints } from '../../reducers/heroReducer';

type UseHeroProfile = {
	profile: ProfileWithMaxPoints,
	loading: boolean
}

export default function useHeroProfile(heroId: string = ''): UseHeroProfile {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const profile = useSelector<RootState>(state => state.hero.profiles[heroId]) as ProfileWithMaxPoints;

	useEffect(() => {
		async function fetchHeroProfile(heroId: string): Promise<void> {
			const { data: heroProfile } = await heroProfileFetcher(heroId);
			dispatch(setProfile(heroId, heroProfile));
			setLoading(false);
		}

		if (!profile) {
			setLoading(true);
			fetchHeroProfile(heroId);
		}
	}, [heroId, profile, dispatch]);

	return { profile, loading: loading || !profile };
}