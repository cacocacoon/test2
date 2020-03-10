import useSWR from 'swr';
import { HEROES, HERO_PROFILE } from '../../api/key';
import { heroProfileFetcher } from '../../api/fetcher';
import { HeroProfileData } from '../../api/responseType';

type UseHeroProfile = {
	profile: HeroProfileData,
	error: unknown,
	loading: boolean
}

export default function useHeroProfile(heroId: string = ''): UseHeroProfile {
	const { data, error, isValidating } = useSWR([HEROES, heroId, HERO_PROFILE], () => heroProfileFetcher(heroId));
	const profile: HeroProfileData = (data?.data ?? {})as HeroProfileData;

	return { profile, error, loading: isValidating };

}