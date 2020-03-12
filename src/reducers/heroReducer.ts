import { Action } from './actionTypes';
import { HeroResponse, HeroProfileResponse } from '../api/responseType';
import { heroProfileFetcher, heroListFetcher } from '../api/fetcher';
import { AppDispatch } from '../Store';

export type ProfileWithMaxPoints = HeroProfileResponse & { maxPoints: number };

type State = {
	list: HeroResponse[],
	profiles: { [key: string]: HeroProfileResponse }
};

const initState: State = {
	list: [],
	profiles: {}
};

const SET_HEROES = 'SET_HEROES';
const SET_PROFILE = 'SET_PROFILE';

type SetHeroesAction = Action<typeof SET_HEROES, { heroes: HeroResponse[] }>;

type SetProfileAction = Action<typeof SET_PROFILE, { heroId: string, profile: HeroProfileResponse }>;

type HeroActionTypes = SetHeroesAction | SetProfileAction;

export function fetchHeroes() {
	return async (): Promise<HeroResponse[]> => {
		const { data } = await heroListFetcher();
		return data;
	};
}

export function setHeroes(heroes: HeroResponse[]): SetHeroesAction {
	return {
		type: SET_HEROES,
		payload: { heroes }
	};
}

export function fetchHeroProfile(heroId: string) {
	return async (disptach: AppDispatch): Promise<ProfileWithMaxPoints> => {
		const { data } = await heroProfileFetcher(heroId);
		const maxPoints = Object.values<number>(data).reduce((accu: number, v: number) => accu + v, 0);
		const profileWithMaxPoints: ProfileWithMaxPoints = {
			...data,
			maxPoints
		};
		disptach(setProfile(heroId, profileWithMaxPoints));

		return profileWithMaxPoints;
	};
}

export function setProfile(heroId: string, profile: ProfileWithMaxPoints): SetProfileAction {
	return {
		type: SET_PROFILE,
		payload: { heroId, profile }
	};
}

export function patchHeroProfile(heroId: number, profile: HeroProfileResponse) {
	return async (): Promise<String> => {
		const response = await fetch(`https://hahow-recruit.herokuapp.com/heroes/${ heroId }/profile`, {
			method: 'PATCH',
			body: JSON.stringify(profile),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		return await response.text();
	};
}

export default function heroReducer(state = initState, action: HeroActionTypes): State {
	switch (action.type) {
	case SET_HEROES:
		return { ...state, list: action.payload.heroes };
	case SET_PROFILE:
		return {
			...state,
			profiles: {
				...state.profiles,
				[action.payload.heroId]: action.payload.profile
			}
		};
	default:
		return state;
	}
}