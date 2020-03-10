import { Dispatch } from 'redux';
import { Action } from './actionTypes';
import { HeroData, HeroProfileData } from '../api/responseType';

type State = {
	list: HeroData[],
	profiles: { [key: string]: HeroProfileData }
};

const initState: State = {
	list: [],
	profiles: {}
};

const SET_HEROES = 'SET_HEROES';
const SET_PROFILE = 'SET_PROFILE';

type SetHeroesAction = Action<typeof SET_HEROES, { heroes: HeroData[] }>;

type SetProfileAction = Action<typeof SET_PROFILE, { heroId: number, profile: HeroProfileData }>;

type HeroActionTypes = SetHeroesAction | SetProfileAction;

export function fetchHeroes() {
	return async (disptach: Dispatch): Promise<void> => {
		const response = await fetch('https://hahow-recruit.herokuapp.com/heroes');
		const heroes = await response.json();
		disptach(setHeroes(heroes));
	};
}

export function setHeroes(heroes: HeroData[]): SetHeroesAction {
	return {
		type: SET_HEROES,
		payload: { heroes }
	};
}

export function fetchHeroProfile(heroId: number) {
	return async (disptach: Dispatch): Promise<void> => {
		const response = await fetch(`https://hahow-recruit.herokuapp.com/heroes/${ heroId }/profile`);
		const profile = await response.json();
		const maxPoints = Object.values<number>(profile).reduce((accu: number, v: number) => accu + v, 0);
		profile.maxPoints = maxPoints;
		disptach(setProfile(heroId, profile));
	};
}

export function setProfile(heroId: number, profile: HeroProfileData): SetProfileAction {
	return {
		type: SET_PROFILE,
		payload: { heroId, profile }
	};
}

export function patchHeroProfile(heroId: number, profile: HeroProfileData) {
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