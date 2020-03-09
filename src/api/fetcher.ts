import axios from 'axios';
import { BASE_URL, HEROES, HERO_PROFILE } from './key';
import { HeroData, HeroProfileData } from './responseType';

const apiInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

export async function heroListFetcher(): Promise<{ data: HeroData[], status: number }> {
	const { data, status } = await apiInstance.get(HEROES);
	return { data, status };
}

export async function heroFetcher(heroId: String): Promise<{ data: HeroData, status: number }> {
	const { data, status } = await apiInstance.get(`${ HEROES }/${ heroId }`);
	return { data, status };
}

export async function heroProfileFetcher(heroId: String): Promise<{ data: HeroProfileData, status: number }> {
	const { data, status } = await apiInstance.get(`${ heroId }${ HERO_PROFILE }`);
	return { data, status };
}

export async function patchHeroProfileFetcher(heroId: String): Promise<{ data: HeroProfileData, status: number }> {
	const { data, status } = await apiInstance.patch(`${ heroId }${ HERO_PROFILE }`);
	return { data, status };
}