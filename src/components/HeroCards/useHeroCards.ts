import useSWR from 'swr';
import { HeroResponse } from '../../api/responseType';
import { HEROES } from '../../api/key';
import { fetchHeroes } from '../../reducers/heroReducer';

type UseHeroesCardsType = {
	heroes: HeroResponse[],
	loading: boolean
}

export default function useHeroesCards(): UseHeroesCardsType {
	const { data, isValidating } = useSWR(HEROES, fetchHeroes());
	const heroes = data ?? [];

	return { heroes, loading: isValidating || heroes.length === 0 };
}