import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../Store';
import { fetchHeroProfile, ProfileWithMaxPoints } from '../../reducers/heroReducer';

type UseHeroProfile = {
	profile: ProfileWithMaxPoints,
	loading: boolean
}

export default function useHeroProfile(heroId: string = ''): UseHeroProfile {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const profile = useSelector<AppState>(state => state.hero.profiles[heroId]) as ProfileWithMaxPoints;

	useEffect(() => {
		if (!profile) {
			setLoading(true);
			(async (): Promise<void> => {
				await dispatch(fetchHeroProfile(heroId));
				setLoading(false);
			})();
		}


	}, [heroId, profile, dispatch]);

	return { profile, loading: loading || !profile };
}