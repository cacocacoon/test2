import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { setHeroes } from '../../reducers/heroReducer';
import { RootState } from '../../Store';
import { HeroData } from '../../api/responseType';
import { HEROES } from '../../api/key';
import { heroListFetcher } from '../../api/fetcher';

type UseHeroesCardsType = {
	heroes: HeroData[],
	loading: boolean
}

export default function useHeroesCards(): UseHeroesCardsType {
	const { data } = useSWR(HEROES, heroListFetcher);
	const heroes = useSelector((state: RootState) => state.hero.list);
	const dispatch = useDispatch();

	useEffect(() => {
		if (data) {
			dispatch(setHeroes(data.data));
		}
	}, [data, dispatch]);

	return { heroes, loading: heroes.length === 0 };
}