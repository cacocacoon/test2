import { Dispatch } from 'redux';
import { Action } from './actionTypes';
import { HeroResponse, HeroProfileResponse } from '../api/responseType';

export type ProfileWithMaxPoints = HeroProfileResponse & { maxPoints: number };

type State = {
	list: HeroResponse[],
	profiles: { [key: string]: ProfileWithMaxPoints }
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
	return async (disptach: Dispatch): Promise<void> => {
		const response = await fetch('https://hahow-recruit.herokuapp.com/heroes');
		const heroes = await response.json();
		disptach(setHeroes(heroes));
	};
}

export function setHeroes(heroes: HeroResponse[]): SetHeroesAction {
	return {
		type: SET_HEROES,
		payload: { heroes }
	};
}

export function fetchHeroProfile(heroId: string) {
	return async (disptach: Dispatch): Promise<void> => {
		const response = await fetch(`https://hahow-recruit.herokuapp.com/heroes/${ heroId }/profile`);
		const profile = await response.json();
		const maxPoints = Object.values<number>(profile).reduce((accu: number, v: number) => accu + v, 0);
		profile.maxPoints = maxPoints;
		disptach(setProfile(heroId, profile));
	};
}

export function setProfile(heroId: string, profile: HeroProfileResponse): SetProfileAction {
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
		const profile = action.payload.profile;
		const maxPoints = Object.values(profile).reduce((accu, v) => accu + v, 0);
		return {
			...state,
			profiles: {
				...state.profiles,
				[action.payload.heroId]: {
					maxPoints,
					...action.payload.profile
				}
			}
		};
	default:
		return state;
	}
}