import { Action } from './actionTypes';

type State = {
	selectedHeroId: String
};

const initState: State = {
	selectedHeroId: '0'
};

const SELECT_HERO = 'SELECT_HERO';

type SelectHeroAction = Action<typeof SELECT_HERO, { heroId: String }>;

export function selectHero(heroId: String): SelectHeroAction {
	return {
		type: SELECT_HERO,
		payload: { heroId }
	};
}

export default function uiReducer(state = initState, action: SelectHeroAction): State {
	switch (action.type) {
	case SELECT_HERO:
		return { ...state, selectedHeroId: action.payload.heroId };
	default:
		return state;
	}
}