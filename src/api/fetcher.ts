import axios, { AxiosInstance } from 'axios';
import { BASE_URL, HEROES, HERO_PROFILE } from './key';
import { HeroResponse, HeroProfileResponse } from './responseType';
import { compose } from 'redux';

const apiInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

function createBaseApiInstance(): AxiosInstance {
	return axios.create({
		baseURL: BASE_URL,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

function withToken(instance: AxiosInstance): AxiosInstance {
	return instance;
}


export async function heroListFetcher(): Promise<{ data: HeroResponse[], status: number }> {
	const apiInstance = compose(withToken, createBaseApiInstance)();
	const { data, status } = await apiInstance.get(HEROES);
	return { data, status };
}

export async function heroFetcher(heroId: String): Promise<{ data: HeroResponse, status: number }> {
	const { data, status } = await apiInstance.get(`${ HEROES }/${ heroId }`);
	return { data, status };
}

export async function heroProfileFetcher(heroId: String): Promise<{ data: HeroProfileResponse, status: number }> {
	const { data, status } = await apiInstance.get(`${ HEROES }/${ heroId }${ HERO_PROFILE }`);
	return { data, status };
}

export async function patchHeroProfileFetcher(heroId: String): Promise<{ data: HeroProfileResponse, status: number }> {
	const { data, status } = await apiInstance.patch(`${ HEROES }/${ heroId }${ HERO_PROFILE }`);
	return { data, status };
}