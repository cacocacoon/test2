import useSWR from 'swr';
import { HeroData } from '../../api/responseType';
import { HEROES } from '../../api/key';
import { heroListFetcher } from '../../api/fetcher';

type UseHeroesCardsType = {
	heroes: HeroData[],
	loading: boolean
}

export default function useHeroesCards(): UseHeroesCardsType {
	const { data, isValidating } = useSWR(HEROES, heroListFetcher);
	const heroes = data?.data ?? [];

	return { heroes, loading: isValidating || heroes.length === 0 };
}