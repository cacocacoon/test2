import { useEffect } from 'react';
import useSWR from 'swr';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store';
import { HEROES, HERO_PROFILE } from '../../api/key';
import { heroProfileFetcher } from '../../api/fetcher';
import { setProfile, ProfileWithMaxPoints } from '../../reducers/heroReducer';

type UseHeroProfile = {
	profile: ProfileWithMaxPoints,
	error: unknown,
	loading: boolean
}

export default function useHeroProfile(heroId: string = ''): UseHeroProfile {
	const { data, error, isValidating } = useSWR([HEROES, heroId, HERO_PROFILE], () => heroProfileFetcher(heroId), {
		revalidateOnFocus: false
	});
	const dispatch = useDispatch();
	const profile = (useSelector<RootState>(state => state.hero.profiles[heroId]) ?? {})as ProfileWithMaxPoints;

	useEffect(() => {
		if (data) {
			dispatch(setProfile(heroId, data.data));
		}
	}, [heroId, data, dispatch]);

	return { profile, error, loading: !profile || isValidating };
}